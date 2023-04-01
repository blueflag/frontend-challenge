import { useContext } from "react";
import { DatasContext } from "../context/DatasContext";
import { CardHolder } from "../components/users/styles";
import UserCardComp from "../components/users/usercard";
import Overview from "../components/users/overview";
const Users = (): JSX.Element => {
  const data = useContext(DatasContext);
  return (
    <>
      <CardHolder>
        <code>Which job position does user X belong to?</code>
        {data?.users !== undefined
          ? data.users.map((user) => {
              return (
                <UserCardComp
                  path={`/users/${user.givenName.toLowerCase()}-${user.familyName.toLowerCase()}`}
                  key={user.id}
                  state={user}
                />
              );
            })
          : ""}
      </CardHolder>
      <Overview />
    </>
  );
};

export default Users;
