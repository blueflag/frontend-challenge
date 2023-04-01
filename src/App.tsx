import { Routes, Route } from "react-router-dom";
import Users from "./pages/users";
import SingleUser from "./pages/single-user";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "@emotion/styled";
import Resources from "./pages/resources";

const Nav = styled.div`
  ${tw`flex flex-row py-6 px-10 justify-between shadow-md`}
  > nav {
    > a:not(:last-of-type) {
      ${tw`mr-4`}
    }
  }
`;
export default function App(): JSX.Element {
  return (
    <>
      <Nav>
        <header className="Header">
          <Link to="/">
            <img
              src="https://blueflag.com.au/assets/logos/blueflag-logo.svg"
              width="130"
              alt="logo"
            />
          </Link>
        </header>
        <nav>
          <Link to="/resources">Resources</Link>
        </nav>
      </Nav>
      <main>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:name" element={<SingleUser />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
        </Routes>
      </main>
    </>
  );
}
