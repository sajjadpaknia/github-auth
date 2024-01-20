import { RouterProvider } from "react-router-dom";
import { routesConfig } from "./routes/routes";
import { useAuth } from "./context/auth";
import axios from "axios";

function App() {
  const { logout } = useAuth();
  axios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        const token = JSON.parse(localStorage.getItem("access_token"));

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response?.status === 401) {
        console.log("errrorrrrrrr");
        logout();
      }
      return Promise.reject(err);
    }
  );
  return <RouterProvider router={routesConfig} />;
}

export default App;
