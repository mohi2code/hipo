import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchProfile, useFetchRepos } from "../api";

export default function Repos() {

  let { username } = useParams();
  const [profile, setProfile] = useState(null);

  const fetchProfile = useFetchProfile();
  const fetchRepos   = useFetchRepos();

  useEffect(() => {
    fetchProfile.execute(username)
    .then(data => {setProfile(data.data); console.log(data);})
    .catch(error => alert(`Error happened, Code - ${error.status}`));
  }, [username]);

  useEffect(() => {
    if (!profile)
      return;

    fetchRepos.execute(profile.login)
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }, [profile]);

  const loadMore = useCallback(() => {
    if (!profile)
      return;

    fetchRepos.execute(profile.login)
    .then(data => console.log(fetchRepos.data))
    .catch(error => console.log(error));
  }, [profile, fetchRepos]);

  return (
    <>
      <div>Retrieving all repos...</div>
      <button onClick={loadMore}>load more...</button>
    </>
  );
}