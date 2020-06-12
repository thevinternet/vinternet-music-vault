import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

import "./LabelAdd.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";

import Input from "../../../components/Utilities/Form/Input/Input";
import FileInput from "../../../components/Utilities/Form/File/File";
import FuzzyInput from "../../../components/Utilities/Form/FuzzyInput/FuzzyInput";

import Button from "../../../components/Utilities/UI/Button/Button";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import { updateObject } from "../../../utilities/helpers";
import { checkValidity } from "../../../utilities/formHelpers/formValidation";

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

class LabelAdd extends Component {
  state = {
    avatar: "labels/avatar.jpg",
    avatarName: "No file(s) selected",
    avatarFile: "",
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
    this.props.onCreateLabelForm();
    this.props.onFetchLabels();
  }

  componentDidUpdate() {
    this.fuse = new Fuse(this.props.stateLabels, this.state.defaultFuseConfigs);
    if (this.state.dataListId) {
      this.dropdownDatalistSetup(this.state.dataListId);
    }
  }

  //===============================================================================================================//

  labelCreateHandler = event => {
    event.preventDefault();

    const labelDataArray = Object.values(this.props.stateLabelForm);
    const labelDataObject = {};
    labelDataObject["parentLabel"] = [];
    labelDataObject["subsidiaryLabel"] = [];
    labelDataObject["website"] = [];

    labelDataArray.forEach(function(element) {
      if (element.elementAttr.name === "parentLabel") {
        element.linkedRecord
          ? labelDataObject.parentLabel.push({ _id: element.id })
          : labelDataObject.parentLabel.push({ name: element.value });
      } else if (element.elementAttr.name === "subsidiaryLabel") {
        element.linkedRecord
          ? labelDataObject.subsidiaryLabel.push({ _id: element.id })
          : labelDataObject.subsidiaryLabel.push({ name: element.value });
      } else if (element.elementAttr.name === "website") {
        labelDataObject.website.push({
          name: element.label,
          url: element.value
        });
      } else {
        labelDataObject[element.elementAttr.name] = element.value;
      }
    });

    const labelId = this.props.stateLabel._id;
    let newLabelData;
    let fileFlag;

    if (this.state.avatarFile) {
      fileFlag = true;
      let labelData = JSON.stringify(labelDataObject);

      newLabelData = new FormData();
      newLabelData.append("id", labelId);
      newLabelData.append("image", this.state.avatarFile);
      newLabelData.append("label", labelData);
    } else {
      fileFlag = false;
      newLabelData = {
        id: labelId,
        label: labelDataObject
      };
    }

    // console.log(this.state.avatarFile);
		console.log(newLabelData);
		console.log(fileFlag);

    // this.props.onAddLabel(newLabelData, fileFlag);
    // this.props.history.replace({ pathname: "/labels" });
  };

  //===============================================================================================================//

  inputChangeHandler = (event, inputIdentifier) => {
    console.log(inputIdentifier);
    const updatedLabelElement = updateObject(
      this.props.stateLabelForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.props.stateLabelForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    const updatedLabelForm = updateObject(this.props.stateLabelForm, {
      [inputIdentifier]: updatedLabelElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedLabelForm) {
      formIsValid = updatedLabelForm[inputIdentifier].valid && formIsValid;
    }

    updatedLabelForm[inputIdentifier] = updatedLabelElement;
    this.setState({
      formIsValid: formIsValid
    });

    this.props.onEditLocalLabel(updatedLabelForm);
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
    console.log(inputIdentifier);
    console.log(event.target);
    const inputValue = event.target.value;
    const matchedRecords = this.fuse.search(inputValue);

    const updatedLabelElement = updateObject(
      this.props.stateLabelForm[inputIdentifier],
      {
        id: inputIdentifier,
        value: inputValue,
        touched: true,
        matchedRecords: matchedRecords,
        linkedRecord: false,
        showDropdown: "true"
      }
    );

    const updatedLabelForm = updateObject(this.props.stateLabelForm, {
      [inputIdentifier]: updatedLabelElement
    });

    this.setState({
      dataListId: inputId
    });

    //console.log(updatedLabelForm);

    this.props.onEditLocalLabel(updatedLabelForm);
  };

  //===============================================================================================================//

  dropdownDatalistSetup = dataListId => {
    const dataList = document.getElementById(dataListId);

    if (dataList.hasChildNodes()) {
      dataList.setAttribute("aria-expanded", true);
      dataList.setAttribute("aria-live", "polite");
    } else {
      dataList.setAttribute("aria-expanded", false);
      dataList.removeAttribute("aria-live");
    }
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
    const updatedLabelElement = updateObject(
      this.props.stateLabelForm[inputIdentifier],
      {
        id: event.target.id,
        value: event.target.value,
        linkedRecord: true,
        showDropdown: "false"
      }
    );

    const updatedLabelForm = updateObject(this.props.stateLabelForm, {
      [inputIdentifier]: updatedLabelElement
    });

    //console.log(updatedLabelForm);

    this.props.onEditLocalLabel(updatedLabelForm);
  };

  //===============================================================================================================//

  labelProfileHandler = event => {
    event.preventDefault();
    this.props.onResetStatus();
    this.props.history.replace({ pathname: "/" });
  };

  //===============================================================================================================//

  render() {
    let formElements = [];
    if (!this.props.stateLoading && this.props.stateLabelForm) {
      for (let key in this.props.stateLabelForm) {
        formElements.push({
          id: key,
          attributes: this.props.stateLabelForm[key]
        });
      }
    }

    //===============================================================================================================//

    let labelForm = <Loader />;
    if (!this.props.stateLoading && this.props.stateError) {
      labelForm = (
        <StatusMessage status={"warning"} message={this.props.stateError} />
      );
    }
    if (!this.props.stateLoading && this.props.stateLabelForm) {
      labelForm = (
        <Auxiliary>
          <h1>Add New Label</h1>
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
            <form onSubmit={this.labelCreateHandler}>
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
                      data={this.props.stateLabels}
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
                <Button type={"warning"} clicked={this.labelProfileHandler}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Auxiliary>
      );
    }
    return <div className="container">{labelForm}</div>;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateLabelForm: state.label.labelForm,
    stateLabels: state.label.labels,
    stateLoading: state.label.loading,
    stateError: state.label.error,
    stateSuccess: state.label.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateLabelForm: () => dispatch(labelActions.addLabelClientPrep()),
    onFetchLabels: () => dispatch(labelActions.fetchLabelsSend()),
    onEditLocalLabel: updatedLabelForm =>
      dispatch(labelActions.editLabelClientInput(updatedLabelForm)),
    onAddLabel: (newLabelData, fileFlag) =>
      dispatch(labelActions.addLabelSend(newLabelData, fileFlag)),
    onResetStatus: () => dispatch(labelActions.labelResetReturnStatus())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelAdd);
