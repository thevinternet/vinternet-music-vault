import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

import "./ArtistAdd.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import { updateObject } from "../../../utilities/helpers";
import { checkValidity } from "../../../utilities/formHelpers/formValidation";
import { dropdownDatalistSetup } from "../../../utilities/formHelpers/formFuzzyDropdown";

import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

class ArtistAdd extends Component {
  state = {
    avatar: "artists/avatar.jpg",
    avatarName: "No file(s) selected",
    avatarFile: "",
    deleting: false,
    formIsValid: false,
    dataListId: "",
    defaultFuseConfigs: {
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ["name"]
    }
  };

  //===============================================================================================================//

  componentDidMount() {
    this.props.onCreateArtistForm();
    this.props.onFetchArtists();
  }

  componentDidUpdate() {
    this.fuse = new Fuse(
      this.props.stateArtists,
      this.state.defaultFuseConfigs
    );
    if (this.state.dataListId) {
      dropdownDatalistSetup(this.state.dataListId);
    }
  }

  //===============================================================================================================//

  artistCreateHandler = event => {
    event.preventDefault();

    //console.log(event.target);

    const artistDataArray = Object.values(this.props.stateArtistForm);
    const artistDataObject = {};
    artistDataObject["aliasName"] = [];
    artistDataObject["website"] = [];

    artistDataArray.forEach(function(element) {
      if (element.elementAttr.name === "aliasName") {
        if (element.linkedRecord) {
          artistDataObject.aliasName.push({ _id: element.id });
        } else if (element.value) {
          artistDataObject.aliasName.push({ name: element.value });
        }
      } else if (element.elementAttr.name === "website") {
        artistDataObject.website.push({
          name: element.label,
          url: element.value
        });
      } else {
        artistDataObject[element.elementAttr.name] = element.value;
      }
    });

    let newArtistData;
    let fileFlag;

    if (this.state.avatarFile) {
      fileFlag = true;
      let artistData = JSON.stringify(artistDataObject);

      newArtistData = new FormData();
      newArtistData.append("image", this.state.avatarFile);
      newArtistData.append("artist", artistData);
    } else {
      fileFlag = false;
      newArtistData = {
        artist: artistDataObject
      };
    }

    this.setState({
      dataListId: ""
    });

    this.props.onAddArtist(newArtistData, fileFlag);
    this.props.history.replace({ pathname: "/artists" });
  };

  //===============================================================================================================//

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedArtistElement = updateObject(
      this.props.stateArtistForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.props.stateArtistForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    const updatedArtistForm = updateObject(this.props.stateArtistForm, {
      [inputIdentifier]: updatedArtistElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedArtistForm) {
      formIsValid = updatedArtistForm[inputIdentifier].valid && formIsValid;
    }

    updatedArtistForm[inputIdentifier] = updatedArtistElement;
    this.setState({
      formIsValid: formIsValid
    });

    this.props.onEditLocalArtist(updatedArtistForm);
  };

  //===============================================================================================================//

  imageUploadPreviewHandler = event => {
    this.setState({
      avatar: URL.createObjectURL(event.target.files[0]),
      avatarName: event.target.files[0].name,
      avatarFile: event.target.files[0]
    });
  };

  //===============================================================================================================//

  fuzzyInputChangeHandler = (event, inputIdentifier, inputId) => {
    const inputValue = event.target.value;
    const matchedRecords = this.fuse.search(inputValue);

    const updatedArtistElement = updateObject(
      this.props.stateArtistForm[inputIdentifier],
      {
        id: inputIdentifier,
        value: inputValue,
        touched: true,
        matchedRecords: matchedRecords,
        linkedRecord: false,
        showDropdown: "true"
      }
    );

    const updatedArtistForm = updateObject(this.props.stateArtistForm, {
      [inputIdentifier]: updatedArtistElement
    });

    this.setState({
      dataListId: inputId
    });

    this.props.onEditLocalArtist(updatedArtistForm);
  };
  
  //===============================================================================================================//

  dropdownItemKeyUpHandler = (event, inputIdentifier, dataListId) => {
    const dataList = document.getElementById(dataListId);
    const moveUp = "ArrowUp";
    const moveDown = "ArrowDown";
    const selectOption = "Enter";

    if (dataList.hasChildNodes()) {
      const dataOptions = [].slice.call(
        dataList.getElementsByTagName("option")
      );

      switch (event.key) {
        case moveUp:
          this.focusNextDataOption(moveUp, dataOptions);
          return;
        case moveDown:
          this.focusNextDataOption(moveDown, dataOptions);
          return;
        case selectOption:
          this.dropdownItemSelectHandler(event, inputIdentifier);
          return;
        default:
          return;
      }
    }
  };

  //===============================================================================================================//

  focusNextDataOption = (direction, dataOptions) => {
    const activeElement = document.activeElement;
    const currentActiveElement = dataOptions.indexOf(activeElement);

    if (direction === "ArrowDown") {
      const lastOptionCheck = currentActiveElement < dataOptions.length - 1;

      if (lastOptionCheck) {
        const nextDataOption = dataOptions[currentActiveElement + 1];
        nextDataOption.focus();
      }
    } else if (direction === "ArrowUp") {
      const firstOptionCheck = currentActiveElement > 0;

      if (firstOptionCheck) {
        const nextDataOption = dataOptions[currentActiveElement - 1];
        nextDataOption.focus();
      }
    }
  };

  //===============================================================================================================//

  dropdownItemSelectHandler = (event, inputIdentifier) => {
    const updatedArtistElement = updateObject(
      this.props.stateArtistForm[inputIdentifier],
      {
        id: event.target.id,
        value: event.target.value,
        linkedRecord: true,
        showDropdown: "false"
      }
    );

    const updatedArtistForm = updateObject(this.props.stateArtistForm, {
      [inputIdentifier]: updatedArtistElement
    });

    this.props.onEditLocalArtist(updatedArtistForm);
  };

  //===============================================================================================================//

  artistProfileHandler = event => {
    event.preventDefault();
    this.props.onResetStatus();
    this.props.history.replace({ pathname: "/" });
  };

  //===============================================================================================================//

  render() {
    let formElements = [];
    if (!this.props.stateLoading && this.props.stateArtistForm) {
      for (let key in this.props.stateArtistForm) {
        formElements.push({
          id: key,
          attributes: this.props.stateArtistForm[key]
        });
      }
    }

    //===============================================================================================================//

    let artistForm = <Loader />;
    if (!this.props.stateLoading && this.props.stateError) {
      artistForm = (
        <StatusMessage status={"warning"} message={this.props.stateError} />
      );
    }
    if (!this.props.stateLoading && this.props.stateArtistForm) {
      artistForm = (
        <Auxiliary>
          <h1>Add New Artist</h1>
          {this.props.stateSuccess ? (
            <StatusMessage
              status={"success"}
              message={this.props.stateSuccess}
            />
          ) : null}
          {this.props.stateError ? (
            <StatusMessage status={"warning"} message={this.props.stateError} />
          ) : null}
          <div className="userform">
            <form onSubmit={this.artistCreateHandler}>
              <div className="input-wrapper">
                {formElements.map((formElement, index) =>
                  formElement.attributes.elementType === "file" ? (
                    <FileInput
                      key={index}
                      elementType={formElement.attributes.elementType}
                      elementAttr={formElement.attributes.elementAttr}
                      elementLabel={formElement.attributes.label}
                      elementLabelFor={formElement.attributes.labelFor}
                      elementId={formElement.attributes.id}
                      elementImage={this.state.avatar}
                      elementImageName={this.state.avatarName}
                      hasUpload={this.state.avatarFile ? true : false}
                      imageUpload={this.state.avatar}
                      imageNameUpload={this.state.avatarName}
                      title={""}
                      changed={event => this.imageUploadPreviewHandler(event)}
                    />
                  ) : formElement.attributes.isFuzzy ? (
                    <FuzzyInput
                      key={index}
                      elementAttr={formElement.attributes.elementAttr}
                      elementLabel={formElement.attributes.label}
                      elementLabelFor={formElement.attributes.labelFor}
                      elementId={formElement.attributes.id}
                      elementValue={formElement.attributes.value}
                      data={this.props.stateArtists}
                      dataListId={`${formElement.attributes.labelFor}List`}
                      matches={formElement.attributes.matchedRecords}
                      showDropdown={formElement.attributes.showDropdown}
                      clicked={event =>
                        this.dropdownItemSelectHandler(event, formElement.id)
                      }
                      changed={event =>
                        this.fuzzyInputChangeHandler(
                          event,
                          formElement.id,
                          `${formElement.attributes.labelFor}List`
                        )
                      }
                      keyup={event =>
                        this.dropdownItemKeyUpHandler(
                          event,
                          formElement.id,
                          `${formElement.attributes.labelFor}List`
                        )
                      }
                    />
                  ) : (
                    <Input
                      key={index}
                      elementType={formElement.attributes.elementType}
                      elementAttr={formElement.attributes.elementAttr}
                      elementLabel={formElement.attributes.label}
                      elementLabelFor={formElement.attributes.labelFor}
                      elementId={formElement.attributes.id}
                      elementValue={formElement.attributes.value}
                      invalid={!formElement.attributes.valid}
                      shouldValidate={formElement.attributes.validation}
                      errorMessage={formElement.attributes.validationError}
                      touched={formElement.attributes.touched}
                      changed={event =>
                        this.inputChangeHandler(event, formElement.id)
                      }
                    />
                  )
                )}
              </div>
              <div className={"userform--actions"}>
                <Button
                  type={this.state.formIsValid ? "primary" : "disabled"}
                  disabled={!this.state.formIsValid}
                >
                  Save
                </Button>
                <Button type={"warning"} clicked={this.artistProfileHandler}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Auxiliary>
      );
    }
    return <div className="container">{artistForm}</div>;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateArtistForm: state.artist.artistForm,
    stateArtists: state.artist.artists,
    stateLoading: state.artist.loading,
    stateError: state.artist.error,
    stateSuccess: state.artist.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateArtistForm: () => dispatch(artistActions.addArtistClientPrep()),
    onFetchArtists: () => dispatch(artistActions.fetchArtistsSend()),
    onEditLocalArtist: updatedArtistForm =>
      dispatch(artistActions.editArtistClientInput(updatedArtistForm)),
    onAddArtist: (newArtistData, fileFlag) =>
      dispatch(artistActions.addArtistSend(newArtistData, fileFlag)),
    onResetStatus: () => dispatch(artistActions.artistResetReturnStatus())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistAdd);
