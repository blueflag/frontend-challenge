import React, { useEffect } from "react";
import UserLearning from "./UserLearning";
import Summary from "./Summary";
export const Mainpage = () => {

  return (
    <>
      <div className="row mainpPageContainer">
        <div className="row rowCenter">
          <Summary />
        </div>
        <div className="row rowCenter">
          <UserLearning />
        </div>
      </div>
    </>
  );
};

export default Mainpage;
