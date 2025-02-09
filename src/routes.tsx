import { createBrowserRouter } from "react-router-dom";
import HomePage from "./containers/Dashboard";
import UserProfile from "./containers/UserProfile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/users/:userId',
    element: <UserProfile />
  }
]);