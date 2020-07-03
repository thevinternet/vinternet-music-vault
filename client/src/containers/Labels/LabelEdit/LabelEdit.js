import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

import "./LabelEdit.scss";

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

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

class LabelEdit extends Component {
  state = {
    avatar: "labels/avatar.jpg",
    avatarName: "No file(s) selected",
    avatarFile: "",
    deleting: false,
    formIsValid: true,
    dataListId: "",
    defaultFuseConfigs: {
      shouldSort: true,
      threshold: 0,
			ignoreLocation: true,
			minMatchCharLength: 3,
      keys: ["name"]
    }
  };

  //===============================================================================================================//

  componentDidMount() {
    this.props.onFetchLabel(this.props.match.params.id, true);
    this.props.onFetchLabels();
  }

  componentDidUpdate() {
    this.fuse = new Fuse(this.props.stateLabels, this.state.defaultFuseConfigs);
    if (this.state.dataListId) {
      this.dropdownDatalistSetup(this.state.dataListId);
    }
  }

  //===============================================================================================================//

  labelUpdateHandler = event => {
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
    let updatedLabelData;
    let fileFlag;

    if (this.state.avatarFile) {
      fileFlag = true;
      let labelData = JSON.stringify(labelDataObject);

      updatedLabelData = new FormData();
      updatedLabelData.append("id", labelId);
      updatedLabelData.append("image", this.state.avatarFile);
      updatedLabelData.append("label", labelData);
    } else {
      fileFlag = false;
      updatedLabelData = {
        id: labelId,
        label: labelDataObject
      };
    }

		console.log(updatedLabelData);
		console.log(fileFlag);

    //this.props.onUpdateLabel(labelId, updatedLabelData, fileFlag);
  };

  //===============================================================================================================//

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedLabelElement = updateObject(
      this.props.stateLabelForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.props.stateLabelForm[inputIdentifier].validationRequired
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
    const inputValue = event.target.value;
    const matchedRecords = this.fuse.search(inputValue);

    const updatedLabelElement = updateObject(
      this.props.stateLabelForm[inputIdentifier],
      {
        id: inputIdentifier,
				value: inputValue,
				valid: checkValidity(
          inputValue,
          this.props.stateLabelForm[inputIdentifier].validationRequired
        ),
        touched: true,
        matchedRecords: matchedRecords,
        linkedRecord: false,
        showDropdown: "true"
      }
    );

    const updatedLabelForm = updateObject(this.props.stateLabelForm, {
      [inputIdentifier]: updatedLabelElement
		});
		
		let formIsValid = true;
    for (let inputIdentifier in updatedLabelForm) {
      formIsValid = updatedLabelForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
			dataListId: inputId,
			formIsValid: formIsValid
    });

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

    this.props.onEditLocalLabel(updatedLabelForm);
  };

  //===============================================================================================================//

  labelProfileHandler = event => {
    event.preventDefault();
    this.props.onResetStatus();
    this.props.history.replace({
      pathname: "/labels/" + this.props.stateLabel._id
    });
  };

  labelDeleteCheckHandler = event => {
    event.preventDefault();
    this.setState({ deleting: true });
  };

  labelDeleteCancelHandler = event => {
    event.preventDefault();
    this.setState({ deleting: false });
  };

  labelDeleteConfirmHandler = event => {
    event.preventDefault();
    this.props.onDeleteLabel(this.props.stateLabel._id);
    this.props.history.replace({ pathname: "/labels/" });
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
    if (!this.props.stateLoading && this.props.stateLabel) {
      labelForm = (
        <Auxiliary>
          <h1>{this.props.stateLabel.label_name}</h1>
          <h2>Update Label Details</h2>
          {this.props.stateSuccess ? (
            <StatusMessage
              status={"success"}
              message={this.props.stateSuccess}
            />
          ) : null}
          <div className="userform">
            <form onSubmit={this.labelUpdateHandler}>
              <div className="input-wrapper">
                {formElements.map((formElement, index) =>
                  formElement.attributes.type === "file" ? (
                    <FileInput
                      key={index}
											elementType={formElement.attributes.type}
											elementId={formElement.attributes.id}
											elementName={formElement.attributes.name}
                      elementLabel={formElement.attributes.label}
                      elementLabelFor={formElement.attributes.labelFor}
                      elementImage={
                        formElement.attributes.pictureLocation
                          ? `labels/${formElement.attributes.pictureLocation}`
                          : this.state.avatar
                      }
                      elementImageName={
                        formElement.attributes.pictureName
                          ? formElement.attributes.pictureName
                          : this.state.avatarName
                      }
                      hasUpload={this.state.avatarFile ? true : false}
                      imageUpload={this.state.avatar}
                      imageNameUpload={this.state.avatarName}
                      title={this.props.stateLabel.label_name}
                      changed={event => this.imageUploadPreviewHandler(event)}
                    />
                  ) : formElement.attributes.isFuzzy ? (
                    <FuzzyInput
											key={index}
											elementType={formElement.attributes.type}
											elementId={formElement.attributes.id}
											elementName={formElement.attributes.name}
                      elementLabel={formElement.attributes.label}
                      elementLabelFor={formElement.attributes.labelFor}
											elementValue={formElement.attributes.value}
											invalid={!formElement.attributes.valid}
                      shouldValidate={formElement.attributes.validationRequired}
                      errorMessage={formElement.attributes.validationFeedback}
                      touched={formElement.attributes.touched}
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
											element={formElement.attributes.element}
											elementType={formElement.attributes.type}
											elementId={formElement.attributes.id}
											elementName={formElement.attributes.name}
                      elementLabel={formElement.attributes.label}
                      elementLabelFor={formElement.attributes.labelFor}
                      elementValue={formElement.attributes.value}
                      invalid={!formElement.attributes.valid}
                      shouldValidate={formElement.attributes.validationRequired}
                      errorMessage={formElement.attributes.validationFeedback}
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

                <Button type={"grey"} clicked={this.labelProfileHandler}>
                  Cancel
                </Button>
                <Button type={"warning"} clicked={this.labelDeleteCheckHandler}>
                  Delete Label
                </Button>
              </div>
            </form>
          </div>
          <Modal
            show={this.state.deleting}
            hide={this.labelDeleteCancelHandler}
          >
            <h2>Delete Label Details</h2>
            <p>
              Please confirm you wish to delete
              <strong> {this.props.stateLabel.label_name} </strong>
              from the database.
            </p>
            <Button type={"warning"} clicked={this.labelDeleteConfirmHandler}>
              Delete Label
            </Button>
            <Button type={"primary"} clicked={this.labelDeleteCancelHandler}>
              Cancel
            </Button>
          </Modal>
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
    stateLabel: state.label.label,
    stateLabels: state.label.labels,
    stateLabelForm: state.label.labelForm,
    stateLoading: state.label.loading,
    stateError: state.label.error,
    stateSuccess: state.label.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLabel: (labelId, edit) =>
      dispatch(labelActions.fetchLabelSend(labelId, edit)),
    onFetchLabels: () => dispatch(labelActions.fetchLabelsSend()),
    onEditLocalLabel: updatedLabelForm =>
      dispatch(labelActions.editLabelClientInput(updatedLabelForm)),
    onUpdateLabel: (labelId, updatedLabelData, fileFlag) =>
      dispatch(
        labelActions.updateLabelSend(labelId, updatedLabelData, fileFlag)
      ),
    onDeleteLabel: labelId => dispatch(labelActions.deleteLabelSend(labelId)),
    onResetStatus: () => dispatch(labelActions.labelResetReturnStatus())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelEdit);

//===============================================================================================================//
