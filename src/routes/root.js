import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedHipoLogo, HipoLogo } from '../components/Hipo'
import styles from '../styles/Root.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import MessageContainer from '../components/Message';
import useMessage from '../hooks/messageApi';

export default function Root() {

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <main className={styles['page']}>
      {
        searchParams.get("animation") === 'false' 
        ? 
        <HipoLogo/>
        : 
        <AnimatedHipoLogo /> 
      }
      <Header isAnimated={searchParams.get("animation") !== 'false'} />
      <Form isAnimated={searchParams.get("animation") !== 'false'} />
    </main>
  );
}

const Header = ({ isAnimated }) => (
  <motion.h1
    initial={isAnimated ? { opacity: 0, y: 20 } : {}}
    animate={isAnimated ? { opacity: 1, y: 0 }: {}}
    transition={isAnimated ? transition : {}}
  >
    Github Profile Explorer
  </motion.h1>
)

const Form = ({ isAnimated }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const context = useMessage();

  function onChange(e) {
    setUsername(e.target.value)
  }
  
  function onSubmit(e) {
    e.preventDefault();

    if (!isValidUsername(username)) {
      context.display({text: 'You need to provide a valid username!'});
      return;
    }

    let _username = username[0] === '@' ? username.substring(1) : username;
    navigate(`/profile/${_username}`);
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={isAnimated && { opacity: 0, y: 20 }}
      animate={isAnimated && { opacity: 1, y: 0 }}
      transition={isAnimated && transition}
    >
      <Input type="text" placeholder="Type @username"  value={username} onChange={onChange} />
      <Button>Search</Button>

      <MessageContainer context={context} />

    </motion.form>
  );
}

function isValidUsername(username) {
  let reg  = RegExp(/^[a-z@\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
  return reg.test(username)
}

const transition={
  ease: 'easeInOut',
  delay: 3,
  duration: 1
};
