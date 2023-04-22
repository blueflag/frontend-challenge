import React, { useContext } from "react";
import MainContext from "./MainContext";

export const LearningResourcesSummary = () => {
  const { state } = useContext(MainContext); // state that handles data for the summary of learning resources

  return (
    <>
      <div className="card">
        <div className="card-body m-0" style={{ padding: "10px" }}>
          <div className="tableUserLearning tableUserLearning-responsive">
            <table className="tableUserLearning">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>TITLE</th>
                  <th>ATTEMPT</th>
                  <th>COMPLETE</th>
                  <th>PASS</th>
                  <th>FAIL</th>
                  <th>ATTEND</th>
                  <th>ENROL</th>
                </tr>
              </thead>
              <tbody>
                {state.learningresourcesummarydata &&
                  state.learningresourcesummarydata.map((item, i) => (
                    <tr key={i}>
                      <td>{item.code}</td>
                      <td>{item.title}</td>
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

export default LearningResourcesSummary;
