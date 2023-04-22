import React, { useEffect, useState } from "react";
import LearningResourcesSummary from "./LearningResourcesSummary";
import UserCompletion from "./UserCompletion";

export const Summary = () => {
  const [userSummaryEnabled, setUserSummaryEnabled] = useState(true);

  useEffect(() => {
    document.getElementById("dUserCompletion").checked = true;
  }, []);
  return (
    <>
      <div className="col-12 userlLearningCard">
        <h3 className="card-title userLearningRecordSummaryTitle">Summary</h3>
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-3">
            {/* User Completion */}
            <div className="radio" onClick={() => setUserSummaryEnabled(true)}>
              <input
                className="inputoption"
                type="radio"
                name="dUserCompletion"
                id="dUserCompletion"
                checked={userSummaryEnabled}
              />
              <label htmlFor="dUserCompletion" className="cr inputlabel">
                User Completion
              </label>
            </div>
            
            {/* Learning Resources */}
            <div className="radio" onClick={() => setUserSummaryEnabled(false)}>
              <input
                className="inputoption"
                type="radio"
                name="dLearningResources"
                id="dLearningResources"
                checked={!userSummaryEnabled}
              />
              <label htmlFor="dLearningResources" className="cr inputlabel">
                Learning Resources
              </label>
            </div>
          </div>
          <div className="col-3">
          </div>
        </div>
        {userSummaryEnabled === true ? (
          <UserCompletion />
        ) : (
          <LearningResourcesSummary />
        )}
      </div>
    </>
  );
};

export default Summary;
