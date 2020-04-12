import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LabelItem from "./LabelItem";
import LabelForm from "./LabelForm";
import { getCurrentUserLabels } from "../../actions/label";

// CSS
import "../../App.css";

const Labels = ({ getCurrentUserLabels, auth, label: { labels, loading } }) => {
  useEffect(() => {
    getCurrentUserLabels();
  }, [getCurrentUserLabels]);

  return loading ? (
    <div></div>
  ) : (
    <Fragment>
      <h1>Labels</h1>
      <p>Welcome to Music Updater!</p>
      <div className="label-container">
        <LabelForm />
        {labels
          .filter(label => !auth.loading && label.user === auth.user._id)
          .map(label => (
            <LabelItem key={label._id} label={label} />
          ))}
      </div>
    </Fragment>
  );
};

Labels.propTypes = {
  getCurrentUserLabels: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  label: state.label,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUserLabels })(Labels);
