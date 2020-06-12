import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

import "./ReleaseEdit.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import Modal from "../../../components/Utilities/Modal/Modal";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import { updateObject, displayToggle } from "../../../utilities/helpers";
import { checkValidity } from "../../../utilities/formHelpers/formValidation";
import { dropdownDatalistSetup, focusNextDataOption } from "../../../utilities/formHelpers/formFuzzyDropdown";
import { formAttrTrk } from "../../../utilities/formHelpers/formAttributeBuilderTrack";


import * as releaseActions from "../../../store/actions/index";

//===============================================================================================================//

class ReleaseEdit extends Component {
  state = {
    avatar: "releases/avatar.jpg",
    avatarName: "No file(s) selected",
    avatarFile: "",
    formIsValid: true,
    deleteTrack: false,
    deleteTrackNumber: "",
    deleteRelease: false,
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

  // ******* REACT LIFECYCLE FUNCITONS ******* //

  componentDidMount() {
    this.props.onFetchRelease(this.props.match.params.id, true);
    this.props.onFetchArtists();
    this.props.onFetchLabels();
  }

  componentDidUpdate() {
    this.fuseArtists = new Fuse(
      this.props.stateArtists,
      this.state.defaultFuseConfigs
    );

    this.fuseLabels = new Fuse(
      this.props.stateLabels,
      this.state.defaultFuseConfigs
    );

    this.state.dataListId && dropdownDatalistSetup(this.state.dataListId);
  }

  //===============================================================================================================//

  releaseUpdateHandler = event => {
    event.preventDefault();

    

    const releaseDataArray = Object.values(this.props.stateReleaseForm);

    console.log(releaseDataArray);

    const releaseDataObject = {};
    releaseDataObject["artistName"] = [];
    releaseDataObject["labelName"] = [];
    releaseDataObject["releaseFormat"] = [];
    releaseDataObject["tracks"] = [];

    releaseDataArray.forEach(function(element) {
      if (element instanceof Array) {
        element.forEach(function(tracks) {
          let trackObj = {};
          trackObj["artistName"] = [];
          Object.values(tracks).forEach(function(track){
            if (track.elementAttr.name === "artistName") {
              if (track.linkedRecord) {
                trackObj["artistName"].push({ _id: track.id });
              } else if (track.value) {
                trackObj["artistName"].push({ name: track.value });
              }
            } else {
              trackObj[track.elementAttr.name] = track.value;
            }
          });
          releaseDataObject["tracks"].push(trackObj);
        });
      }
      else if (element.elementAttr.name === "artistName") {
        if (element.linkedRecord) {
          releaseDataObject.artistName.push({ _id: element.id });
        } else if (element.value) {
          releaseDataObject.artistName.push({ name: element.value });
        }
      }
      else if (element.elementAttr.name === "labelName") {
        if (element.linkedRecord) {
          releaseDataObject.labelName.push({ _id: element.id });
        } else if (element.value) {
          releaseDataObject.labelName.push({ name: element.value });
        }
      }
      else if (element.elementAttr.name === "releaseFormat") {
        if (element.value) {
          releaseDataObject.releaseFormat.push({ name: element.label, release: element.value });
        }
      }
      else {
        releaseDataObject[element.elementAttr.name] = element.value;
      }
    });

    const releaseId = this.props.stateRelease._id;
    let updatedReleaseData;
    let fileFlag;

    if (this.state.avatarFile) {
      fileFlag = true;
      let releaseData = JSON.stringify(releaseDataObject);

      updatedReleaseData = new FormData();
      updatedReleaseData.append("id", releaseId);
      updatedReleaseData.append("image", this.state.avatarFile);
      updatedReleaseData.append("release", releaseData);
    } else {
      fileFlag = false;
      updatedReleaseData = {
        id: releaseId,
        release: releaseDataObject
      };
    }

    this.setState({
      dataListId: ""
    });

		console.log(updatedReleaseData);
		console.log(fileFlag);
    //console.log(JSON.stringify(releaseDataObject));

    //this.props.onUpdateRelease(releaseId, updatedReleaseData, fileFlag);
  };

  //===============================================================================================================//

  inputChangeHandler = (event, inputIdentifier) => {

    const updatedReleaseElement = updateObject(
      this.props.stateReleaseForm[inputIdentifier],
      {
        value: event.target.type === "checkbox" && event.target.checked ? "yes" : event.target.value,
        valid: checkValidity(
          event.target.value,
          this.props.stateReleaseForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    const updatedReleaseForm = updateObject(this.props.stateReleaseForm, {
      [inputIdentifier]: updatedReleaseElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedReleaseForm) {
      if (inputIdentifier !== "tracks") {
        formIsValid = updatedReleaseForm[inputIdentifier].valid && formIsValid;
      }
    }

    this.setState({
      formIsValid: formIsValid
    });

    this.props.onEditLocalRelease(updatedReleaseForm);
  };

  //===============================================================================================================//

  trackInputChangeHandler = (event, arrayIndex, inputIdentifier) => {

    console.log(this.props.stateReleaseForm);

    console.log(arrayIndex);

    const updatedReleaseElement = updateObject(
      this.props.stateReleaseForm.tracks[arrayIndex][inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.props.stateReleaseForm.tracks[arrayIndex][inputIdentifier].validation
        ),
        touched: true
      }
    );

    const track = updateObject(
      this.props.stateReleaseForm.tracks[arrayIndex],
      { [inputIdentifier] : updatedReleaseElement }
    );
    
    const tracksArray = [...this.props.stateReleaseForm.tracks];

    const tracks = tracksArray.map((element, index) => {
      if (index !== arrayIndex) {
        return element
      }
      return {
        ...element,
        ...track
      }
    })

    const updatedReleaseForm = updateObject(
      this.props.stateReleaseForm,
      { tracks }
    );

    let formIsValid = true;
    for (let inputIdentifier in updatedReleaseForm.tracks[arrayIndex]) {
      formIsValid = updatedReleaseForm.tracks[arrayIndex][inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formIsValid: formIsValid
    });

    this.props.onEditLocalRelease(updatedReleaseForm);
  };

  //===============================================================================================================//

  trackAddHandler = event => {
    event.preventDefault();

    const currentTracks = [...this.props.stateReleaseForm.tracks];

    const blankTrackNumber = currentTracks.length + 1;
    const blankTrack = formAttrTrk([ { track_number: blankTrackNumber, artist_name: "", title: "", catalogue: "", genre: "", mixkey: "" } ]);
    
    const tracks = currentTracks.concat(blankTrack);

    const updatedReleaseForm = updateObject(
      this.props.stateReleaseForm,
      { tracks }
    );

    this.props.onEditLocalRelease(updatedReleaseForm);
  }

  //===============================================================================================================//

  trackDeleteCheckHandler = (event, arrayIndex) => {
    event.preventDefault();
    this.setState({ deleteTrack: true, deleteTrackNumber: arrayIndex });
  };

  trackDeleteCancelHandler = event => {
    event.preventDefault();
    this.setState({ deleteTrack: false, deleteTrackNumber: "" });
  };

  trackDeleteConfirmHandler = event => {
    event.preventDefault();

    //console.log(arrayIndex);

    const currentTracks = [...this.props.stateReleaseForm.tracks];

    const tracks = currentTracks.filter(track => track.trackNumber.value !== this.state.deleteTrackNumber);

    console.log(tracks);

    const updatedReleaseForm = updateObject(
      this.props.stateReleaseForm,
      { tracks }
    );

    this.props.onEditLocalRelease(updatedReleaseForm);
    this.setState({ deleteTrack: false, deleteTrackNumber: "" });
  }




  //===============================================================================================================//

  imageUploadPreviewHandler = event => {
    this.setState({
      avatar: URL.createObjectURL(event.target.files[0]),
      avatarName: event.target.files[0].name,
      avatarFile: event.target.files[0]
    });
  };

  //===============================================================================================================//

  fuzzyInputChangeHandler = (event, inputIdentifier, inputId, dataSource) => {
    
    const inputValue = event.target.value;
    const matchedRecords = dataSource === "artistName" ? this.fuseArtists.search(inputValue) : this.fuseLabels.search(inputValue);

    const updatedReleaseElement = updateObject(
      this.props.stateReleaseForm[inputIdentifier],
      {
        id: inputIdentifier,
        value: inputValue,
        touched: true,
        matchedRecords: matchedRecords,
        linkedRecord: false,
        showDropdown: "true"
      }
    );

    const updatedReleaseForm = updateObject(this.props.stateReleaseForm, {
      [inputIdentifier]: updatedReleaseElement
    });

    this.setState({
      dataListId: inputId
    });

    this.props.onEditLocalRelease(updatedReleaseForm);
  };

  //===============================================================================================================//

  trackFuzzyInputChangeHandler = (event, arrayIndex, inputIdentifier, inputId) => {
    const inputValue = event.target.value;
    const matchedRecords = this.fuseArtists.search(inputValue);

    const updatedTrackElement = updateObject(
      this.props.stateReleaseForm.tracks[arrayIndex][inputIdentifier],
      {
        id: inputIdentifier,
        value: inputValue,
        touched: true,
        matchedRecords: matchedRecords,
        linkedRecord: false,
        showDropdown: "true"
      }
    );

    const updatedTrack = updateObject(this.props.stateReleaseForm.tracks[arrayIndex], {
      [inputIdentifier] : updatedTrackElement
    });
    
    const tracksArray = [...this.props.stateReleaseForm.tracks];

    const tracks = tracksArray.map((track, index) => {
      if (index !== arrayIndex) {
        return track
      }
      return {
        ...track,
        ...updatedTrack
      }
    })

    const updatedReleaseForm = updateObject(this.props.stateReleaseForm, { tracks });

    this.setState({
      dataListId: inputId
    });

    this.props.onEditLocalRelease(updatedReleaseForm);
  };

  //===============================================================================================================//

  dropdownItemKeyUpHandler = (event, inputIdentifier, dataListId, trackSelect, arrayIndex) => {
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
          trackSelect === true
            ? this.trackDropdownItemSelectHandler(event, arrayIndex, inputIdentifier)
            : this.dropdownItemSelectHandler(event, inputIdentifier);
          return;
        default:
          return;
      }
    }
  };

  //===============================================================================================================//

  dropdownItemSelectHandler = (event, inputIdentifier) => {
    const updatedReleaseElement = updateObject(
      this.props.stateReleaseForm[inputIdentifier],
      {
        id: event.target.id,
        value: event.target.value,
        linkedRecord: true,
        showDropdown: "false"
      }
    );

    const updatedReleaseForm = updateObject(this.props.stateReleaseForm, {
      [inputIdentifier]: updatedReleaseElement
    });

    this.props.onEditLocalRelease(updatedReleaseForm);
  };
    
  //===============================================================================================================//

  trackDropdownItemSelectHandler = (event, arrayIndex, inputIdentifier) => {
    const updatedTrackElement = updateObject(
      this.props.stateReleaseForm.tracks[arrayIndex][inputIdentifier],
      {
        id: event.target.id,
        value: event.target.value,
        linkedRecord: true,
        showDropdown: "false"
      }
    );

    const updatedTrack = updateObject(this.props.stateReleaseForm.tracks[arrayIndex], {
      [inputIdentifier] : updatedTrackElement
    });
    
    const tracksArray = [...this.props.stateReleaseForm.tracks];

    const tracks = tracksArray.map((track, index) => {
      if (index !== arrayIndex) {
        return track
      }
      return {
        ...track,
        ...updatedTrack
      }
    })

    const updatedReleaseForm = updateObject(this.props.stateReleaseForm, { tracks });

    this.props.onEditLocalRelease(updatedReleaseForm);
  };
    
  //===============================================================================================================//


  releaseProfileHandler = event => {
    event.preventDefault();
    this.props.onResetStatus();
    this.props.history.replace({
      pathname: "/releases/" + this.props.stateRelease._id
    });
  };

  //===============================================================================================================//

  releaseDeleteCheckHandler = event => {
    event.preventDefault();
    this.setState({ deleteRelease: true });
  };

  releaseDeleteCancelHandler = event => {
    event.preventDefault();
    this.setState({ deleteRelease: false });
  };

  releaseDeleteConfirmHandler = event => {
    event.preventDefault();
    this.props.onDeleteRelease(this.props.stateRelease._id);
    this.props.history.replace({ pathname: "/releases/" });
  };

  //===============================================================================================================//

  render() {
    let formElements = [];
    if (!this.props.stateLoading && this.props.stateRelease) {
      for (let key in this.props.stateReleaseForm) {
        formElements.push({
          id: key,
          attributes: this.props.stateReleaseForm[key]
        });
      }
      console.log(formElements);
    }

    //===============================================================================================================//

    let releaseForm = <Loader />;
    if (!this.props.stateLoading && this.props.stateError) {
      releaseForm = (
        <StatusMessage status={"warning"} message={this.props.stateError} />
      );
    }
    if (!this.props.stateLoading && this.props.stateRelease) {
      releaseForm = (
        <Auxiliary>
          <h1>{this.props.stateRelease.title}</h1>
          <h2>Update Release Details</h2>
          {this.props.stateSuccess ? (
            <StatusMessage
              status={"success"}
              message={this.props.stateSuccess}
            />
          ) : null}
          <div className="userform">
            <form onSubmit={this.releaseUpdateHandler}>
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
                          ? `releases/${formElement.attributes.pictureLocation}`
                          : this.state.avatar
                      }
                      elementImageName={
                        formElement.attributes.pictureName
                          ? formElement.attributes.pictureName
                          : this.state.avatarName
                      }
                      hasUpload={this.state.avatarFile ? true : false}
                      imageUpload={`${this.state.avatar}`}
                      imageNameUpload={this.state.avatarName}
                      title={this.props.stateRelease.title}
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
                        data={
                          formElement.attributes.elementAttr.name === "artistName"
                            ? this.props.stateArtists
                            : this.props.stateLabels
                        }
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
                            `${formElement.attributes.labelFor}List`,
                            formElement.attributes.elementAttr.name
                          )
                        }
                        keyup={event =>
                          this.dropdownItemKeyUpHandler(
                            event,
                            formElement.id,
                            `${formElement.attributes.labelFor}List`,
                            false
                          )
                        }
                      />
                    ) : formElement.id === "tracks" ? (
                      formElement.attributes.map((element, arrayIndex) =>
                        <fieldset key={arrayIndex} className="userform--track">
                          <legend className="closed" onClick={displayToggle}>Edit Track {arrayIndex + 1}</legend>
                          <div className="visually-hidden">
                            {Object.values(element).map((element, index) =>
                              element.isFuzzy ? (
                                <FuzzyInput
                                  key={index}
                                  elementAttr={element.elementAttr}
                                  elementLabel={element.label}
                                  elementLabelFor={element.labelFor}
                                  elementId={element.id}
                                  elementValue={element.value}
                                  data={this.props.stateArtists}
                                  dataListId={`${element.labelFor}List${arrayIndex}`}
                                  matches={element.matchedRecords}
                                  showDropdown={element.showDropdown}
                                  clicked={event =>
                                    this.trackDropdownItemSelectHandler(
                                      event,
                                      arrayIndex,
                                      element.fuzzyRef
                                    )
                                  }
                                  changed={event =>
                                    this.trackFuzzyInputChangeHandler(
                                      event,
                                      arrayIndex,
                                      element.fuzzyRef,
                                      `${element.labelFor}List${arrayIndex}`
                                    )
                                  }
                                  keyup={event =>
                                    this.dropdownItemKeyUpHandler(
                                      event,
                                      element.fuzzyRef,
                                      `${element.labelFor}List${arrayIndex}`,
                                      true,
                                      arrayIndex
                                    )
                                  }
                                />
                              ) : (
                                <Input
                                  key={index}
                                  elementType={element.elementType}
                                  elementAttr={element.elementAttr}
                                  elementLabel={element.label}
                                  elementLabelFor={element.labelFor}
                                  elementId={element.id}
                                  arrayIndex={arrayIndex}
                                  elementValue={element.value}
                                  invalid={!element.valid}
                                  shouldValidate={element.validation}
                                  errorMessage={element.validationError}
                                  touched={element.touched}
                                  changed={event =>
                                    this.trackInputChangeHandler(event, arrayIndex, element.id)
                                  }
                                />
                              )
                            )}
                            <Button type={"warning"} clicked={event => this.trackDeleteCheckHandler(event, arrayIndex)} >
                              Delete Track
                            </Button>
                          </div>
                        </fieldset>
                      )                    
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
                <Button type={"primary"} clicked={this.trackAddHandler} >
                  Add New Track
                </Button>
              </div>
              <div className={"userform--actions"}>
                <Button
                  type={this.state.formIsValid ? "success" : "disabled"}
                  disabled={!this.state.formIsValid}
                >
                  Save Release
                </Button>

                <Button type={"grey"} clicked={this.releaseProfileHandler}>
                  Cancel
                </Button>
                <Button
                  type={"warning"}
                  clicked={this.releaseDeleteCheckHandler}
                >
                  Delete Release
                </Button>
              </div>
            </form>
          </div>

          <Modal
            show={this.state.deleteTrack}
            hide={this.trackDeleteCancelHandler}
          >
            <h2>Delete Track</h2>
            <p>
              Please confirm you wish to delete
              <strong> Track {this.state.deleteTrackNumber}</strong>.
            </p>
            <Button type={"warning"} clicked={this.trackDeleteConfirmHandler}>
              Delete Track
            </Button>
            <Button type={"primary"} clicked={this.trackDeleteCancelHandler}>
              Cancel
            </Button>
          </Modal>

          <Modal
            show={this.state.deleteRelease}
            hide={this.releaseDeleteCancelHandler}
          >
            <h2>Delete Release Details</h2>
            <p>
              Please confirm you wish to delete
              <strong> {this.props.stateRelease.title} </strong>
              from the database.
            </p>
            <Button type={"warning"} clicked={this.releaseDeleteConfirmHandler}>
              Delete Release
            </Button>
            <Button type={"primary"} clicked={this.releaseDeleteCancelHandler}>
              Cancel
            </Button>
          </Modal>
        </Auxiliary>
      );
    }
    return <div className="container">{releaseForm}</div>;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateRelease: state.release.release,
    stateArtists: state.artist.artists,
    stateLabels: state.label.labels,
    stateReleaseForm: state.release.releaseForm,
    stateLoading: state.release.loading,
    stateError: state.release.error,
    stateSuccess: state.release.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRelease: (releaseId, edit) =>
      dispatch(releaseActions.fetchReleaseSend(releaseId, edit)),
    onFetchArtists: () => dispatch(releaseActions.fetchArtistsSend()),
    onFetchLabels: () => dispatch(releaseActions.fetchLabelsSend()),
    onEditLocalRelease: updatedReleaseForm =>
      dispatch(releaseActions.editReleaseClientInput(updatedReleaseForm)),
    onUpdateRelease: (releaseId, updatedReleaseData, fileFlag) =>
      dispatch(
        releaseActions.updateReleaseSend(releaseId, updatedReleaseData, fileFlag)
      ),
    onDeleteRelease: releaseId =>
      dispatch(releaseActions.deleteReleaseSend(releaseId)),
    onResetStatus: () => dispatch(releaseActions.releaseResetReturnStatus())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleaseEdit);

//===============================================================================================================//
