import { motion } from 'framer-motion';
import styles from './Profile.module.css';

export const ProfileContainer = ({ data }) => (
  <div className={styles['profile']}>
    <div style={{ backgroundImage: `url("${data && data.avatar_url}")` }} className={styles['profile-img']}></div>
    <a href={data && data.html_url} target="_blank" rel="noopener noreferrer" className={styles['profile-link']}>
      View on Github <LinkIcon width={22.66} height={17.63} />
    </a>

    <div className={styles['profile-name']}>
      <h1>{data && data.name}</h1>
      <h1>@{data && data.login}</h1>
    </div>

    <div className={styles['profile-stats']}>
      <div className={styles['stat']}>
        <p className={styles['stat-num']}>{data && data.public_repos}</p>
        <p className={styles['stat-text']}>Repositories</p>
      </div>
      <div className={styles['stat']}>
        <p className={styles['stat-num']}>{data && kFormatter(data.following)}</p>
        <p className={styles['stat-text']}>Following</p>
      </div>
      <div className={styles['stat']}>
        <p className={styles['stat-num']}>{data && kFormatter(data.followers)}</p>
        <p className={styles['stat-text']}>Followers</p>
      </div>
    </div>
  </div>
);

export const ReposContainer = ({ children }) => (
  <div className={styles['repos-container']}>
    <h1>Repositories</h1>
    {children}
  </div>
)

export const Repository = ({ data }) => (
  <motion.a initial={initial} animate={animate} target="_blank" rel="noopener noreferrer" href={data && data.html_url} className={styles['repository']}>
    <div className={styles['repository__desc']}>
      <p>{data && data.name}</p>
      <p>{data && data.description}</p>
    </div>
    <div className={styles['repository__stats']}>
      <p>{commaFormatter(data && data.stargazers_count)}</p>
      <p>Stars</p>
    </div>
  </motion.a>
)

export const EmptyRepos = () => (
  <div className={styles['empty-repo']}>
    <p>This user has no repositories...</p>
  </div>
)

const LinkIcon = (props) => (
  <svg fill='#E5E5E5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
    <path d="M598.6 41.41C570.1 13.8 534.8 0 498.6 0s-72.36 13.8-99.96 41.41l-43.36 43.36c15.11 8.012 29.47 17.58 41.91 30.02 3.146 3.146 5.898 6.518 8.742 9.838l37.96-37.96C458.5 72.05 477.1 64 498.6 64c20.67 0 40.1 8.047 54.71 22.66 14.61 14.61 22.66 34.04 22.66 54.71s-8.049 40.1-22.66 54.71l-133.3 133.3C405.5 343.1 386 352 365.4 352s-40.1-8.048-54.71-22.66C296 314.7 287.1 295.3 287.1 274.6s8.047-40.1 22.66-54.71l4.44-3.49c-2.1-3.9-4.3-7.9-7.5-11.1-8.6-8.6-19.9-13.3-32.1-13.3-11.93 0-23.1 4.664-31.61 12.97-30.71 53.96-23.63 123.6 22.39 169.6C293 402.2 329.2 416 365.4 416c36.18 0 72.36-13.8 99.96-41.41L598.6 241.3c28.45-28.45 42.24-66.01 41.37-103.3-.87-35.9-14.57-69.84-41.37-96.59zM234 387.4l-37.9 37.9C181.5 439.1 162 448 141.4 448c-20.67 0-40.1-8.047-54.71-22.66-14.61-14.61-22.66-34.04-22.66-54.71s8.049-40.1 22.66-54.71l133.3-133.3C234.5 168 253.1 160 274.6 160s40.1 8.048 54.71 22.66c14.62 14.61 22.66 34.04 22.66 54.71s-8.047 40.1-22.66 54.71l-3.51 3.52c2.094 3.939 4.219 7.895 7.465 11.15C341.9 315.3 353.3 320 365.4 320c11.93 0 23.1-4.664 31.61-12.97 30.71-53.96 23.63-123.6-22.39-169.6C346.1 109.8 310.8 96 274.6 96c-36.2 0-72.3 13.8-99.9 41.4L41.41 270.7C13.81 298.3 0 334.48 0 370.66c0 36.18 13.8 72.36 41.41 99.97C69.01 498.2 105.2 512 141.4 512c36.18 0 72.36-13.8 99.96-41.41l43.36-43.36c-15.11-8.012-29.47-17.58-41.91-30.02-3.21-3.11-5.91-6.51-8.81-9.81z" />
  </svg>
)

const kFormatter = (num) => {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num)
}

function commaFormatter(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const initial = { opacity: 0, y: 20 }
const animate = { opacity: 1, y: 0, transition: { delay: .2 } }
