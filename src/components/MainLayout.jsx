import { Outlet } from "react-router-dom";
import classes from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={classes.container}>
      <Outlet />
    </div>
  );
}

export default MainLayout;
