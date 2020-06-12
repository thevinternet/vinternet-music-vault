import React, { Component } from "react";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";

import "./LabelList.scss";

import Auxiliary from "../../../wrappers/Auxiliary/Auxiliary";
import LabelListItem from "../../../components/Lists/Label/LabelListItem";
import Loader from "../../../components/Utilities/UI/Loader/Loader";
import StatusMessage from "../../../components/Utilities/UI/StatusMessage/StatusMessage";

import * as labelActions from "../../../store/actions/index";

//===============================================================================================================//

class LabelList extends Component {
  componentDidMount() {
    this.props.onFetchLabels();
  }

  //===============================================================================================================//

  render() {
    let labelList = <Loader />;
    if (!this.props.stateLoading) {
      labelList = (
        <div className="container">
          <h1>Labels</h1>
          {this.props.stateError ? (
            <StatusMessage status={"warning"} message={this.props.stateError} />
          ) : (
            <Auxiliary>
              {this.props.stateSuccess ? (
                <StatusMessage
                  status={"success"}
                  message={this.props.stateSuccess}
                />
              ) : null}
              <p>Showing {this.props.stateLabels.length} results</p>
              <ol className="list--block">
                {this.props.stateLabels.map(label => (
                  <LabelListItem
                    key={label._id}
                    labelId={label._id}
                    labelName={label.name}
                    picture={label.picture}
                  />
                ))}
              </ol>
              <Link smooth to="#content">
                Back To Top
              </Link>
            </Auxiliary>
          )}
        </div>
      );
    }
    return labelList;
  }
}

//===============================================================================================================//

// ******* REDUX STATE MANAGEMENT ******* //

const mapStateToProps = state => {
  return {
    stateLabels: state.label.labels,
    stateLoading: state.label.loading,
    stateError: state.label.error,
    stateSuccess: state.label.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchLabels: () => dispatch(labelActions.fetchLabelsSend())
  };
};

//===============================================================================================================//

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelList);

//===============================================================================================================//
