import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DatasContext } from "../context/DatasContext";
import { UsersTypes } from "../types/UsersTypes";
import {
  UserContainer,
  UserDataContainer,
  SingleUserName,
  SingleUserOccupation,
  DataContainer,
  DetailsContainer,
  DetailsListItem,
} from "../components/single-user/styles";
import { RecordsTypes } from "../types/RecordsTypes";
import { ResourcesTypes } from "../types/ResourcesTypes";

interface LocationState {
  userData: UsersTypes;
}

const SingleUser = () => {
  const data = useContext(DatasContext);
  const location = useLocation().state as LocationState;
  const [userRecords, setUserRecords] = useState<RecordsTypes[]>([]);
  const [attempts, setAttempts] = useState<RecordsTypes[] | []>([]);
  const [completed, setCompleted] = useState<RecordsTypes[] | []>([]);
  const [fail, setFail] = useState<RecordsTypes[] | []>([]);
  const [pass, setPass] = useState<RecordsTypes[] | []>([]);
  const [enroll, setEnroll] = useState<RecordsTypes[] | []>([]);
  const [attend, setAttend] = useState<RecordsTypes[] | []>([]);
  const [attemptResource, setAttemptResource] = useState<ResourcesTypes[] | []>(
    []
  );
  const [completeResource, setCompletedResource] = useState<
    ResourcesTypes[] | []
  >([]);
  const [failResource, setFailResource] = useState<ResourcesTypes[] | []>([]);
  const [passResource, setPassResource] = useState<ResourcesTypes[] | []>([]);
  const [enrollResource, setEnrollResource] = useState<ResourcesTypes[] | []>(
    []
  );
  const [attendResource, setAttendResource] = useState<ResourcesTypes[] | []>(
    []
  );
  const { userData } = location;

  const getRecords = () => {
    const records = data?.records.filter((d) => d.user_id === userData.id);
    return records;
  };

  useEffect(() => {
    const userRecord = getRecords();
    if (userRecord !== undefined) {
      if (userRecords.length <= 0) {
        setUserRecords(userRecord);
      }
    }
  }, [data]);

  useEffect(() => {
    if (userRecords !== undefined) {
      const attempt = userRecords.filter(
        (x) => x.learning_record_verb === "ATTEMPT"
      );
      const completed = userRecords.filter(
        (x) => x.learning_record_verb === "COMPLETE"
      );
      const fail = userRecords.filter((x) => x.learning_record_verb === "FAIL");
      const pass = userRecords.filter((x) => x.learning_record_verb === "PASS");
      const enroll = userRecords.filter(
        (x) => x.learning_record_verb === "ENROL"
      );
      const attend = userRecords.filter(
        (x) => x.learning_record_verb === "ATTEND"
      );
      setCompleted(completed);
      setAttempts(attempt);
      setFail(fail);
      setPass(pass);
      setEnroll(enroll);
      setAttend(attend);
    }
  }, [userRecords]);

  useEffect(() => {
    if (attempts.length > 0) {
      if (data?.resources !== undefined) {
        const d = attempts.map((attempt) => {
          const id = attempt.learning_resource_id;
          const attemptResource = data.resources.filter((d) => {
            return d.masterId === id;
          });
          return attemptResource[0];
        });

        setAttemptResource(d);
      }
    }
  }, [attempts, data?.resources]);

  useEffect(() => {
    if (completed.length > 0) {
      if (data?.resources !== undefined) {
        const d = completed.map((complete) => {
          const id = complete.learning_resource_id;
          const completeResource = data.resources.filter((d) => {
            return d.masterId === id;
          });
          return completeResource[0];
        });

        setCompletedResource(d);
      }
    }
  }, [completed, data?.resources]);
  useEffect(() => {
    if (fail.length > 0) {
      if (data?.resources !== undefined) {
        const d = fail.map((fail) => {
          const id = fail.learning_resource_id;
          const failResource = data.resources.filter((d) => {
            return d.masterId === id;
          });
          return failResource[0];
        });

        setFailResource(d);
      }
    }
  }, [fail, data?.resources]);
  useEffect(() => {
    if (pass.length > 0) {
      if (data?.resources !== undefined) {
        const d = pass.map((pass) => {
          const id = pass.learning_resource_id;
          const passResource = data.resources.filter((d) => {
            return d.masterId === id;
          });
          return passResource[0];
        });

        setPassResource(d);
      }
    }
  }, [pass, data?.resources]);
  useEffect(() => {
    if (enroll.length > 0) {
      if (data?.resources !== undefined) {
        const d = enroll.map((enroll) => {
          const id = enroll.learning_resource_id;
          const enrollResource = data.resources.filter((d) => {
            return d.masterId === id;
          });
          return enrollResource[0];
        });

        setEnrollResource(d);
      }
    }
  }, [enroll, data?.resources]);
  useEffect(() => {
    if (attend.length > 0) {
      if (data?.resources !== undefined) {
        const d = attend.map((attend) => {
          const id = attend.learning_resource_id;
          const attendResource = data.resources.filter((d) => {
            return d.masterId === id;
          });
          return attendResource[0];
        });

        setAttendResource(d);
      }
    }
  }, [attend, data?.resources]);

  return (
    <UserContainer>
      <UserDataContainer>
        <SingleUserName>
          {userData.givenName} {userData.familyName}
        </SingleUserName>
        <SingleUserOccupation>{userData.jobPositions}</SingleUserOccupation>
        <code>Has user X attempted or completed learning resource Y?</code>
      </UserDataContainer>

      <DataContainer>
        <DetailsContainer>
          <h3>Attempts</h3>
          <ul>
            {attempts.length > 0 && attemptResource.length > 0 ? (
              attempts.map((att, i) => {
                return (
                  <DetailsListItem key={att.learning_resource_id}>
                    <p className="code">{attemptResource[i].code}</p>
                    <p className="title">{attemptResource[i].title}</p>
                    <p className="last-attempt">
                      Last Attempt:{" "}
                      {new Date(att.learning_record_timestamp).toLocaleString(
                        "en-AU",
                        { timeZone: "Australia/Sydney" }
                      )}
                    </p>
                  </DetailsListItem>
                );
              })
            ) : (
              <DetailsListItem>No data yet!</DetailsListItem>
            )}
          </ul>
        </DetailsContainer>
        <DetailsContainer>
          <h3>Completed</h3>
          <ul>
            {completed.length > 0 && completeResource.length > 0 ? (
              completed.map((att, i) => {
                return (
                  <DetailsListItem key={att.learning_resource_id}>
                    <p className="code">{completeResource[i].code}</p>
                    <p className="title">{completeResource[i].title}</p>
                    <p className="last-attempt">
                      Completed at:{" "}
                      {new Date(att.learning_record_timestamp).toLocaleString(
                        "en-AU",
                        { timeZone: "Australia/Sydney" }
                      )}
                    </p>
                  </DetailsListItem>
                );
              })
            ) : (
              <DetailsListItem>No data yet!</DetailsListItem>
            )}
          </ul>
        </DetailsContainer>
        <DetailsContainer>
          <h3>Fail</h3>
          <ul>
            {fail.length > 0 && failResource.length > 0 ? (
              fail.map((att, i) => {
                return (
                  <DetailsListItem key={att.learning_resource_id}>
                    <p className="code">{failResource[i].code}</p>
                    <p className="title">{failResource[i].title}</p>
                    <p className="last-attempt">
                      Completed at:{" "}
                      {new Date(att.learning_record_timestamp).toLocaleString(
                        "en-AU",
                        { timeZone: "Australia/Sydney" }
                      )}
                    </p>
                  </DetailsListItem>
                );
              })
            ) : (
              <DetailsListItem>No data yet!</DetailsListItem>
            )}
          </ul>
        </DetailsContainer>
        <DetailsContainer>
          <h3>Pass</h3>
          <ul>
            {pass.length > 0 && passResource.length > 0 ? (
              pass.map((att, i) => {
                return (
                  <DetailsListItem key={att.learning_resource_id}>
                    <p className="code">{passResource[i].code}</p>
                    <p className="title">{passResource[i].title}</p>
                    <p className="last-attempt">
                      Completed at:{" "}
                      {new Date(att.learning_record_timestamp).toLocaleString(
                        "en-AU",
                        { timeZone: "Australia/Sydney" }
                      )}
                    </p>
                  </DetailsListItem>
                );
              })
            ) : (
              <DetailsListItem>No data yet!</DetailsListItem>
            )}
          </ul>
        </DetailsContainer>
        <DetailsContainer>
          <h3>Enroll</h3>
          <ul>
            {enroll.length > 0 && enrollResource.length > 0 ? (
              enroll.map((att, i) => {
                return (
                  <DetailsListItem key={att.learning_resource_id}>
                    <p className="code">{enrollResource[i].code}</p>
                    <p className="title">{enrollResource[i].title}</p>
                    <p className="last-attempt">
                      Completed at:{" "}
                      {new Date(att.learning_record_timestamp).toLocaleString(
                        "en-AU",
                        { timeZone: "Australia/Sydney" }
                      )}
                    </p>
                  </DetailsListItem>
                );
              })
            ) : (
              <DetailsListItem>No data yet!</DetailsListItem>
            )}
          </ul>
        </DetailsContainer>
        <DetailsContainer>
          <h3>Attend</h3>
          <ul>
            {attend.length > 0 && attendResource.length > 0 ? (
              attend.map((att, i) => {
                return (
                  <DetailsListItem key={att.learning_resource_id}>
                    <p className="code">{attendResource[i].code}</p>
                    <p className="title">{attendResource[i].title}</p>
                    <p className="last-attempt">
                      Completed at:{" "}
                      {new Date(att.learning_record_timestamp).toLocaleString(
                        "en-AU",
                        { timeZone: "Australia/Sydney" }
                      )}
                    </p>
                  </DetailsListItem>
                );
              })
            ) : (
              <DetailsListItem>No data yet!</DetailsListItem>
            )}
          </ul>
        </DetailsContainer>
      </DataContainer>
    </UserContainer>
  );
};

export default SingleUser;
