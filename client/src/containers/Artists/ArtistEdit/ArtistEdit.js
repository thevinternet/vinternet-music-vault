import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

import "./ArtistEdit.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import { updateObject } from "../../../utilities/helpers";
import { checkValidity } from "../../../utilities/formHelpers/formValidation";
import { dropdownDatalistSetup, focusNextDataOption } from "../../../utilities/formHelpers/formFuzzyDropdown";


import * as artistActions from "../../../store/actions/index";

//===============================================================================================================//

class ArtistEdit extends Component {
  state = {
    avatar: "avatar.jpg",
    avatarName: "No file(s) selected",
    avatarFile: "",
    deleting: false,
    formIsValid: true,
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
    this.props.onFetchArtist(this.props.match.params.id, true);
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

  artistUpdateHandler = event => {
    event.preventDefault();

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

    const artistId = this.props.stateArtist._id;
    let updatedArtistData;
    let fileFlag;

    if (this.state.avatarFile) {
      fileFlag = true;
      let artistData = JSON.stringify(artistDataObject);

      updatedArtistData = new FormData();
      updatedArtistData.append("id", artistId);
      updatedArtistData.append("image", this.state.avatarFile);
      updatedArtistData.append("artist", artistData);
    } else {
      fileFlag = false;
      updatedArtistData = {
        id: artistId,
        artist: artistDataObject
      };
    }

    this.setState({
      dataListId: ""
    });

    this.props.onUpdateArtist(artistId, updatedArtistData, fileFlag);
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
          focusNextDataOption(moveUp, dataOptions);
          return;
        case moveDown:
          focusNextDataOption(moveDown, dataOptions);
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
    this.props.history.replace({
      pathname: "/artists/" + this.props.stateArtist._id
    });
  };

  //===============================================================================================================//

  artistDeleteCheckHandler = event => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  artistDeleteCancelHandler = event => {
    event.preventDefault();
    this.setState({ deleting: false });
  };

  artistDeleteConfirmHandler = event => {
    event.preventDefault();
    this.props.onDeleteArtist(this.props.stateArtist._id);
    this.props.history.replace({ pathname: "/artists/" });
  };

  //===============================================================================================================//

  render() {
    let formElements = [];
    if (!this.props.stateLoading && this.props.stateArtist) {
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
    if (!this.props.stateLoading && this.props.stateArtist) {
      artistForm = (
        <Auxiliary>
          <h1>{this.props.stateArtist.artist_name}</h1>
          <h2>Update Artist Details</h2>
          {this.props.stateSuccess ? (
            <StatusMessage
              status={"success"}
              message={this.props.stateSuccess}
            />
          ) : null}
          <div className="userform">
            <form onSubmit={this.artistUpdateHandler}>
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
                      elementImage={
                        formElement.attributes.pictureLocation
                          ? `artists/${formElement.attributes.pictureLocation}`
                          : `artists/${this.state.avatar}`
                      }
                      elementImageName={
                        formElement.attributes.pictureName
                          ? formElement.attributes.pictureName
                          : this.state.avatarName
                      }
                      hasUpload={this.state.avatarFile ? true : false}
                      imageUpload={`${this.state.avatar}`}
                      imageNameUpload={this.state.avatarName}
                      title={this.props.stateArtist.artist_name}
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

                <Button type={"grey"} clicked={this.artistProfileHandler}>
                  Cancel
                </Button>
                <Button
                  type={"warning"}
                  clicked={this.artistDeleteCheckHandler}
                >
                  Delete Artist
                </Button>
              </div>
            </form>
          </div>
          <Modal
            show={this.state.deleting}
            hide={this.artistDeleteCancelHandler}
          >
            <h2>Delete Artist Details</h2>
            <p>
              Please confirm you wish to delete
              <strong> {this.props.stateArtist.name} </strong>
              from the database.
            </p>
            <Button type={"warning"} clicked={this.artistDeleteConfirmHandler}>
              Delete Artist
            </Button>
            <Button type={"primary"} clicked={this.artistDeleteCancelHandler}>
              Cancel
            </Button>
          </Modal>
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
    stateArtist: state.artist.artist,
    stateArtists: state.artist.artists,
    stateArtistForm: state.artist.artistForm,
    stateLoading: state.artist.loading,
    stateError: state.artist.error,
    stateSuccess: state.artist.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchArtist: (artistId, edit) =>
      dispatch(artistActions.fetchArtistSend(artistId, edit)),
    onFetchArtists: () => dispatch(artistActions.fetchArtistsSend()),
    onEditLocalArtist: updatedArtistForm =>
      dispatch(artistActions.editArtistClientInput(updatedArtistForm)),
    onUpdateArtist: (artistId, updatedArtistData, fileFlag) =>
      dispatch(
        artistActions.updateArtistSend(artistId, updatedArtistData, fileFlag)
      ),
    onDeleteArtist: artistId =>
      dispatch(artistActions.deleteArtistSend(artistId)),
    onResetStatus: () => dispatch(artistActions.artistResetReturnStatus())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistEdit);

//===============================================================================================================//
