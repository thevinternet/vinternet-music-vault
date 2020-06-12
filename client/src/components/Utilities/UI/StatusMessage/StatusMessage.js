import React from "react";

import "./StatusMessage.scss";

//===============================================================================================================//

const statusMessage = props => {
  console.log(props.status);
  return (
    <div
      className={["status--highlight", ["theme--" + props.status]].join(" ")}
    >
      <p>{props.message}</p>
    </div>
  );
};

//===============================================================================================================//

export default statusMessage;
