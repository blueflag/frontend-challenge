import React, { useContext } from "react";
import MainContext from "./MainContext";
export const UserLearning = () => {
  const { state, setSelectedUser, selectedUser } = useContext(MainContext);

  const GetDate = (args) => {
    const d = new Date(args);
    //YEAR
    const yr = d.getFullYear();

    //MONTH
    const mn =
      d.getMonth().toString().length < 2
        ? "0" + (parseInt(d.getMonth().toString()) + 1)
        : parseInt(d.getMonth()) + 1;

    //DATE
    const dd =
      d.getDate().toString().length < 2
        ? "0" + parseInt(d.getDate().toString())
        : parseInt(d.getDate());

    //HOUR-FORMAT(24)
    const hh = d.getHours();

    //MINUTE
    const min = d.getMinutes();

    return yr + "-" + mn + "-" + dd + " " + hh + ":" + min;
  };

  return (
    <>
      <div className="col-12 userlLearningCard">
        {state.userdata && (
          <div className="row userSelection">
            <div className="col-4">
              <select
                className="justify-content-start"
                placeholder="Select User"
                name="UserSelection"
                onChange={(e) => setSelectedUser(e.target.value)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Select a user"
              >
                <option>{"Select a user"}</option>
                {state.userdata.map((item, i) => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.select}
                    >
                      {item.givenName} {item.familyName}
                      {" ("}
                      {item.jobPositions}
                      {")"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-8">
            <div className="card">
              <div className="card-body m-0" style={{ padding: "10px" }}>
                <div className="tableUserLearning tableUserLearning-responsive">
                  {state.mylearningrecorddata && (
                    <table className="tableUserLearning">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.mylearningrecorddata &&
                          state.mylearningrecorddata.map((item, i) => (
                            <tr key={i}>
                              <td>{item.code}</td>
                              <td>{item.title}</td>
                              <td>{item.learning_record_verb}</td>
                              <td>{GetDate(item.learning_record_timestamp)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card userLearningRecordSummaryCard ">
              <div className="card-body">
                {/* Title */}
                <h5 className="card-title userLearningRecordSummaryTitle">
                  Total Content
                </h5>

                {/* Record Count */}
                <div>
                  <h2 className="card-body userLearningRecordSummaryBody">
                    {selectedUser !== ""
                      ? state.mylearningrecorddata.length
                      : 0}{" "}
                    {" Record(s)"}
                  </h2>
                </div>

                {/* Record Summary */}
                <div className="card-body userLearningRecordSummaryStatus">
                  {state.mylearningrecordsummarydata &&
                    state.mylearningrecordsummarydata.map((item, idx) => (
                      <div
                        className="userLearningRecordSummaryStatus"
                        key={idx}
                      >
                        <h6 style={{justifyContent: "center"}}>
                          {item[1]} {item[0]}
                        </h6>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLearning;
