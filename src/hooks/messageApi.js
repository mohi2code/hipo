import { useState } from "react";

export default function useMessage() {

  const [show, setShow] = useState(false);
  const [type, setType] = useState("error");
  const [text, setText] = useState("");

  const display = ({type="error", text, duration=3000}) => {
    setType(type || 'error');
    setText(text);
    setShow(true);

    show === false && setTimeout(() => setShow(false), duration);
  }

  const context = {
    show, 
    type,
    text,
    display,
  }

  return context;

}