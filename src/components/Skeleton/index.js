import { motion } from 'framer-motion';
import styles from './Skeleton.module.css';

const animate = { 
  backgroundColor: ['#222222', '#484848'],
  transition: {
    duration: .75,
    ease: 'circIn',
    repeat: Infinity,
    repeatType: 'reverse'
  }
};

export const ProfileSkeleton = () => (
  <motion.div className={styles['profile']}>
    <motion.div animate={animate} className={styles['profile__img']}></motion.div>
    <motion.div className={styles['profile__name']}>
      <motion.div animate={animate} className={styles['name']}></motion.div>
      <motion.div animate={animate} className={styles['name-short']}></motion.div>
    </motion.div>
  </motion.div>
);

export const ReposSkeleton = () => (
  <motion.div className={styles['repos']}>
    <motion.div animate={animate} className={styles['name']}></motion.div>
    <motion.div className={styles['repo']}>
      <motion.div animate={animate} className={styles['name-long']}></motion.div>
      <motion.div animate={animate} className={styles['name']}></motion.div>
    </motion.div>
    <motion.div className={styles['repo']}>
      <motion.div animate={animate} className={styles['name-long']}></motion.div>
      <motion.div animate={animate} className={styles['name']}></motion.div>
    </motion.div>
  </motion.div>
);
