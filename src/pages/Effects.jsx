import { useState, useEffect } from "react";
import "../css/Effects.css";

function Effects() {
  // Exercise 1: Timer
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Excercise 2: Window Dimensions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: runs when isRunning changes or component unmounts
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  // Window resize effect
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup: remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // NOTE:  El useEffect con array vacío [], se ejecuta solo una vez cuando el componente se monta (aparece en pantalla).

  return (
    <div>
      <h1>useEffect Practice</h1>

      {/* Exercise 1: Timer */}
      <section className="effect-card">
        <h2>Exercise 1: Timer</h2>
        <p className="timer-display">Seconds: {seconds}s</p>
        <div className="button-group">
          <button onClick={() => setIsRunning(true)} disabled={isRunning}>
            Start
          </button>
          <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
            Stop
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </section>

      {/* Exercise 2: Window Dimensions */}
      <section className="effect-card">
        <h2>Exercise 2: Window Dimensions</h2>
        <p>
          Current Width: <strong>{windowWidth}px</strong>
        </p>
        <p>
          Current Height: <strong>{windowHeight}px</strong>
        </p>
        <p className="hint">Resize the browser window to see it change</p>
      </section>
    </div>
  );
}

export default Effects;
