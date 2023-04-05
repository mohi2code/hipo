import { forwardRef } from "react";
import classNames from "classnames";
import styles from './Button.module.css';

const Button = forwardRef(({ type="default", children, className, ...props }, ref) => (
  <button
    ref={ref}
    className={classNames(styles['button'], styles[`${type}`], className)}
    {...props}
  >
    {children}
  </button>
))

Button.displayName="Button";
export default Button;
