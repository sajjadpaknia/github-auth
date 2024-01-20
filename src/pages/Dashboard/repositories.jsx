import { useEffect, useState } from "react";
import classes from "./repositories.module.css";
import axios from "axios";

function Repositories() {
  const [repos, setRepos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  useEffect(() => {
    const getRepos = async () => {
      await axios
        .get("https://api.github.com/users/sajjadpaknia/repos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setRepos(res.data);
        });
    };
    getRepos();
  }, [token]);

  return (
    <>
      <p className={classes.title_heading}>Repositories ({repos.length})</p>
      <ul className={classes.repo_list}>
        {repos ? (
          repos.map((repo) => {
            return (
              <li className={classes.repo_list_item} key={repo.id}>
                <div>
                  <svg
                    class="bi bi-file-text"
                    fill="currentColor"
                    height="25"
                    viewBox="0 0 16 16"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                  </svg>
                </div>
                <div className={classes.repo_detail}>
                  <h1>{repo.name}</h1>
                  <h3>{repo.full_name}</h3>
                </div>
                <a
                  target="_blank"
                  href={`https://github.com/sajjadpaknia/${repo.name}/zipball/master`}
                  className={classes.repo_download}
                >
                  <svg
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18,19 L18,17 C19.6568542,17 21,15.6568542 21,14 C21,12.3431458 19.6568542,11 18,11 C17.9686786,11.0001061 17.9686786,11.0001061 17.9374883,11.0006341 L17.0737589,11.0181765 L16.9309417,10.1661557 C16.5303438,7.77626335 14.4511274,6 12,6 C10.1923998,6 8.55429829,6.96642863 7.6664163,8.50398349 L7.39066076,8.98151234 L6.83965518,9.0031404 C4.69934052,9.08715198 3,10.8504451 3,13 C3,14.8638394 4.27477279,16.4299397 6,16.8739825 L6,18.9170416 C3.16228666,18.4409635 1,15.9729963 1,13 C1,9.95876977 3.26703071,7.43346119 6.21989093,7.05027488 C7.50901474,5.16507238 9.65343535,4 12,4 C15.1586186,4 17.8750012,6.1056212 18.7254431,9.0522437 C21.1430685,9.40362782 23,11.4849591 23,14 C23,16.7614237 20.7614237,19 18,19 Z M11,18.2532546 L11,12 L13,12 L13,18.2532546 L15.2928932,16.0092816 L16.7071068,17.3933221 L12,22 L7.29289322,17.3933221 L8.70710678,16.0092816 L11,18.2532546 Z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
}

export default Repositories;
