import React, { useState, useEffect, useRef } from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [passedTime, setPassedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - passedTime;
  }

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
       setPassedTime( Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setPassedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(passedTime / (1000 * 60 * 60));
    let mins = Math.floor((passedTime / (1000 * 60)) % 60);
    let sec = Math.floor((passedTime / 1000) % 60);
    let mlsec = Math.floor((passedTime % 1000) / 10);

    return `${mins}:${sec}:${mlsec}`;
  }

  return (
    <>
      <div className="h-50 w-100 border-2 rounded flex flex-col items-center justify-center bg-blue-200 m-15 p-5">
        <div className="display w-full h-15 border-1 rounded flex items-center justify-center text-4xl bg-yellow-100 mb-10 p-8">{formatTime()}</div>
        <div className="w-full flex justify-evenly items-center">
          <button className="bg-red-500 h-10 w-20 border-1 rounded " onClick={start}>
            Start
          </button>
          <button className="bg-green-500 h-10 w-20 border-1 rounded" onClick={stop}>
            Stop
          </button>
          <button className="bg-blue-500 h-10 w-20 border-1 rounded" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default StopWatch;
