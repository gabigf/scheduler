import { useState } from "react";

export default function useVisualMode(initMode) {
  const [ mode, setMode ] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  const back = () => {
    if (history.length === 1) {
        setMode(initMode);
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
