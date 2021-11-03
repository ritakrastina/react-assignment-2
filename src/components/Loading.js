import { Fragment } from "react";

const Loading = ({ loading }) => {
  return (
    <Fragment>
      {loading && <div className="loading-container">... loading</div>}
    </Fragment>
  );
};

export default Loading;
