import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Home, Signup, Login } from "./pages";
import store from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";
import { AuthWrapper } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthWrapper authenticate={false}>
            <Signup />
          </AuthWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <AuthWrapper authenticate={false}>
            <Login />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <h1>Route Not Found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
