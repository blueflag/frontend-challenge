import { useContext, useState, useEffect } from "react";
import { DatasContext } from "../../context/DatasContext";
import { UsersTypes } from "../../types/UsersTypes";
import {
  OverviewContainer,
  OverviewItems,
  Card,
} from "../../components/users/styles";
import UserCardComp from "./usercard";
import { ResourcesTypes } from "../../types/ResourcesTypes";
const Overview = (): JSX.Element => {
  const data = useContext(DatasContext);
  const [highestUsers, setHeighestUsers] = useState<UsersTypes[]>([]);
  const [usersNoComplete, setUsersNoComplete] = useState<UsersTypes[]>([]);
  const [completedCourses, setCompletedCourses] = useState<string | undefined>(
    undefined
  );
  const [notInteracted, setNotInteracted] = useState<ResourcesTypes[] | []>([]);
  const datasLength: number[] = [];

  const mostCompleted = (arr: string[]) => {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  };

  useEffect(() => {
    if (data?.users !== undefined) {
      const users = data.users.filter((userData) => {
        const userWhoCompleted = data?.records
          .filter((d) => d.user_id === userData.id)
          .filter((x) => x.learning_record_verb === "COMPLETE");
        datasLength.push(userWhoCompleted.length);
        return userWhoCompleted.length > 0;
      });
      const users2 = data.users.filter((userData) => {
        const userNoCompleted = data?.records
          .filter((d) => d.user_id === userData.id)
          .filter((x) => x.learning_record_verb === "COMPLETE");
        return userNoCompleted.length === 0;
      });
      setUsersNoComplete(users2);
      if (datasLength.length > 0) {
        const highestIndex = datasLength
          .filter((a) => a !== 0)
          .reduce(function (a: number[], e, i) {
            if (e === Math.max(...datasLength)) a.push(i);
            return a;
          }, []);
        const userArr: UsersTypes[] = [];
        highestIndex.map((h) => userArr.push(users[h]));
        setHeighestUsers(userArr);
      }
    }
  }, [data?.users, data?.records]);

  useEffect(() => {
    if (data?.records !== undefined) {
      const filteredRecords = data.records
        .filter((data) => {
          return data.learning_record_verb === "COMPLETE";
        })
        .map((x) => x.learning_resource_id);
      const mostCompletedResource = mostCompleted(filteredRecords);
      if (mostCompletedResource !== undefined) {
        setCompletedCourses(mostCompletedResource);
      }
    }
  }, [data?.records]);

  const mostCompletedResource = data?.resources.filter(
    (data) => data.masterId === completedCourses
  );

  useEffect(() => {
    const recordsId: string[] = [];
    if (data?.records !== undefined && data.resources !== undefined) {
      data?.records.map((data) => {
        recordsId.push(data.learning_resource_id);
      });
      const res = data?.resources.filter((data) => {
        return recordsId.indexOf(data.masterId) === -1;
      });
      setNotInteracted(res);
    }
  }, [data?.records, data?.resources]);
  console.log(notInteracted);
  return (
    <OverviewContainer>
      <h2>Quick Overview</h2>
      <OverviewItems>
        <code>Who has completed a lot of the learning resources?</code>

        {highestUsers.map((user) => {
          return (
            <UserCardComp
              path={`/users/${user.givenName.toLowerCase()}-${user.familyName.toLowerCase()}`}
              key={user.id}
              state={user}
            />
          );
        })}
        <code>Who hasn't?</code>
        {usersNoComplete.map((user) => {
          return (
            <UserCardComp
              path={`/users/${user.givenName.toLowerCase()}-${user.familyName.toLowerCase()}`}
              key={user.id}
              state={user}
            />
          );
        })}
      </OverviewItems>
      <OverviewItems>
        <code>Which learning resources have been completed the most?</code>
        {mostCompletedResource?.map((resource) => {
          return (
            <Card key={resource.masterId}>
              <p className="code">{resource.code}</p>
              <p className="title">{resource.title}</p>
            </Card>
          );
        })}
      </OverviewItems>
      <OverviewItems>
        <code>
          Which learning resources have not been interacted with at all yet?
        </code>
        {notInteracted.length > 0 ? (
          notInteracted.map((resource) => {
            return (
              <Card key={resource.masterId}>
                <p className="code">{resource.code}</p>
                <p className="title">{resource.title}</p>
              </Card>
            );
          })
        ) : (
          <Card>
            <p className="title">No data yet!</p>
          </Card>
        )}
      </OverviewItems>
    </OverviewContainer>
  );
};

export default Overview;
