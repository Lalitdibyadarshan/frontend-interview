import React, { useState } from "react";
import "./App.css";
import { usePrevious } from "./hooks/usePrevious";
import { useIdle } from "./hooks/useIdle";
import { useDebounce } from "./hooks/useDebounce";
import { useResponsive } from "./hooks/useResponsive";

function App() {
  const [currentVal, setCurrentVal] = useState(0);
  const value = usePrevious(currentVal);
  const isIdle = useIdle(2000);
  const screen = useResponsive();
  console.log(value);

  const debounced = useDebounce(() => setCurrentVal((prev) => prev + 1), 2000);

  return (
    <>
      {
        <p>
          currentVal {currentVal}, prevVal: {value}
        </p>
      }
      {<p>isIdle {isIdle + ""}</p>}
      {<p>screen {JSON.stringify(screen)}</p>}
      <button onClick={() => debounced()}>+</button>
    </>
  );
}

export default App;
