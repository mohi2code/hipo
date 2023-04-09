import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchProfile, useFetchRepos } from "../api";
import styles from '../styles/Repos.module.css';
import Button from '../components/Button';
import { ProfileSkeleton, ReposSkeleton } from "../components/Skeleton";
import { ProfileContainer, ReposContainer, Repository } from "../components/Profile";

export default function Repos() {

  const scrollBottom = useRef(null);
  let { username } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    scrollBottom.current?.scrollIntoView({behavior: 'smooth'});
  }, [fetchRepos]);

  return (
    <main className={styles['container']}>
      <Button onClick={() => navigate('/?animation=false')} type="link" style={{marginBottom: '3rem', marginRight: 'auto', width: 'fit-content'}}>&lt; Back to search</Button>
      { fetchProfile.isLoading ? <ProfileSkeleton /> : <ProfileContainer data={fetchProfile.data && fetchProfile.data.data} /> }
      { 
        fetchProfile.isLoading 
        ? 
        <ReposSkeleton /> 
        : 
        <ReposContainer>
          {fetchRepos.data.map(repo => <Repository key={repo.id} data={repo} />)}
        </ReposContainer>
      }
      { !fetchProfile.isLoading && (
        <Button 
          onClick={loadMore} 
          type="primary"
          disabled={!fetchRepos.remaining || fetchRepos.isLoading}
        >
          { fetchRepos.isLoading ? 'Loading...': 'Load More' }
        </Button>
      )}

      <div ref={scrollBottom}></div>
    </main>
  );
}


