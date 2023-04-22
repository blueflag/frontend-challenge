import React, { useContext, useState, useEffect } from "react";
import MainContext from "./MainContext";
export const UserCompletion = () => {
  const { state } = useContext(MainContext);

  const [userCompletionData, setUserCompletionData] = useState([]);

  useEffect(() => {
    if (state.usercompletiondata) {
      setUserCompletionData(state.usercompletiondata);
    }
  }, [state.usercompletiondata]);
  return (
    <>
          <div className="card">
            <div className="card-body m-0" style={{ padding: "10px" }}>
              <div className="tableUserLearning tableUserLearning-responsive">
                <table className="tableUserLearning">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>JOB POSITION</th>
                      <th>ATTEMPT</th>
                      <th>COMPLETE</th>
                      <th>PASS</th>
                      <th>FAIL</th>
                      <th>ATTEND</th>
                      <th>ENROL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userCompletionData &&
                      userCompletionData.map((item, i) => (
                        <tr key={i}>
                          <td>
                            {item.givenName} {item.familyName}
                          </td>
                          <td>{item.jobPositions}</td>
                          <td>
                            {item.statusSum[0]._status === "ATTEMPT"
                              ? item.statusSum[0].tCount
                              : 0}
                          </td>
                          <td>
                            {item.statusSum[1]._status === "COMPLETE"
                              ? item.statusSum[1].tCount
                              : 0}
                          </td>
                          <td>
                            {item.statusSum[2]._status === "PASS"
                              ? item.statusSum[2].tCount
                              : 0}
                          </td>
                          <td>
                            {item.statusSum[3]._status === "FAIL"
                              ? item.statusSum[3].tCount
                              : 0}
                          </td>
                          <td>
                            {item.statusSum[4]._status === "ATTEND"
                              ? item.statusSum[4].tCount
                              : 0}
                          </td>
                          <td>
                            {item.statusSum[5]._status === "ENROL"
                              ? item.statusSum[5].tCount
                              : 0}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </>
  );
};

export default UserCompletion;
