import { useEffect, useState } from "react";
import classes from "./dashboard.module.css";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Repositories from "./repositories";

function Dashboard() {
  const { setIsLoggedIn } = useAuth();
  const [userData, setUserData] = useState({});
  const [repoURL, setRepoURL] = useState("");
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserData(res.data);
          setRepoURL(res.data.repos_url);
          setIsLoggedIn(true);
        });
    };
    getUserData();
  }, [token]);
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <div className={classes.profile}>
          <article className={classes.profile_pic}>
            <img src={userData.avatar_url} loading="lazy" />
          </article>
          <h1 className={classes.name}>{userData.name}</h1>
          <h3 className={classes.bio}>{userData.bio}</h3>
          <div className={classes.sub_bio}>
            <p>
              <span>{userData.followers}</span>Followers
            </p>
            <p>
              <span>{userData.following}</span>Following
            </p>
          </div>
        </div>
      </div>
      <div className={classes.main_content}>
        <Repositories repoURL={repoURL} />
      </div>
    </div>
  );
}

export default Dashboard;
