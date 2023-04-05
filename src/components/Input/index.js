import { forwardRef } from "react";
import classNames from "classnames";
import styles from './Input.module.css';

const Input = forwardRef(({className, ...props }, ref) => (
  <input 
    ref={ref}
    className={classNames(styles['input'], className)}
    {...props}
  />
));

Input.displayName="Input";
export default Input;