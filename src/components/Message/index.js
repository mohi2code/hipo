import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './Message.module.css';

const MessageContainer = ({ context, ...props }) => (
  <AnimatePresence>
    {
      context.show 
      && 
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 15 }}
        className={classNames(styles['message'], styles[`${context.type}`])}
        {...props}
      >
        <p>{context.text}</p>
      </motion.div>
    }
  </AnimatePresence>
)

export default MessageContainer;
