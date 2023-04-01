import { UserCard } from "../../components/users/styles";
import { UsersTypes } from "../../types/UsersTypes";

type Card = {
  path: string;
  state: UsersTypes;
};

const Usercard = ({ path, state }: Card): JSX.Element => {
  return (
    <UserCard to={path} state={{ userData: state }}>
      <span className="fullname">{state.givenName}</span>{" "}
      <span>{state.familyName}</span>
      <span className="jobPosition">{state.jobPositions}</span>
    </UserCard>
  );
};

export default Usercard;
