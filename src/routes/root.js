import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedHipoLogo } from '../components/Hipo'
import styles from '../styles/Root.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import MessageContainer from '../components/Message';
import useMessage from '../hooks/messageApi';

export default function Root() {
  return (
    <main className={styles['page']}>
      <AnimatedHipoLogo />
      <Header />
      <Form />
    </main>
  );
}

const Header = () => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={transition}
  >
    Github Profile Explorer
  </motion.h1>
)

const Form = () => {

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
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
