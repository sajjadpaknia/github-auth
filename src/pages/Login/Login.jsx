import { useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";

function Login() {
  const userAuth = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_CLIENT_ID
      }`
    );
  };

  const handleLogin = async (code) => {
    const postData = {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      code,
    };
    await axios
      .post("/api/login/oauth/access_token", postData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        window.location.reload();
      });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    if (code) {
      handleLogin(code);
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <article className={classes.logo}>
          <img src="./public/github-mark.svg" alt="" />
        </article>
        <h1 className={classes.text_heading}>Login with GitHub</h1>
        <button className={classes.btn} onClick={userAuth}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
