import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [seconds, setSeconds] = useState(10);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);

  /* ================================
     COUNTDOWN
  ================================= */

  useEffect(() => {
    if (!running || finished) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setRunning(false);
          return 1;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, finished]);


  /* ================================
     SHOW COMING SOON AFTER FULL CIRCLE
  ================================= */

  useEffect(() => {
    if (seconds !== 1 || finished) return;

    const timer = setTimeout(() => {
      setFinished(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, finished]);


  /* ================================
     PROGRESS

     10 = 0%
      9 = 11%
      8 = 22%
      ...
      1 = 100%
  ================================= */

  const progress = (10 - seconds) / 9;

  const circumference = 2 * Math.PI * 82;


  /* ================================
     PAUSE / RESUME
  ================================= */

  const handlePauseResume = () => {
    if (finished) return;

    setRunning((prev) => !prev);
  };


  /* ================================
     RESET
  ================================= */

  const handleReset = () => {
    setSeconds(10);
    setRunning(true);
    setFinished(false);
  };


  return (
    <div className="page">

      {/* Background glow */}

      <div className="bg-glow blue-glow"></div>
      <div className="bg-glow purple-glow"></div>


      <div className="main-container">

        {/* ==========================
            HEADER
        =========================== */}

        <div className="header">

          <h1>LOADER COUNTDOWN</h1>

          <p>
            NEURAL TIMER SUBSYSTEM
          </p>

        </div>


        {/* ==========================
            MAIN CARD
        =========================== */}

        <div className="timer-card">

          {!finished ? (

            <>

              {/* =====================================
                  COMPLETE LOADER
              ====================================== */}

              <div
                className={`loader ${
                  !running ? "is-paused" : ""
                }`}
              >


                {/* =================================
                    SVG CIRCLE SYSTEM
                ================================== */}

                <svg
                  className="loader-svg"
                  viewBox="0 0 360 360"
                >


                  {/* =================================
                      1️⃣ INNER DARK BLUE COUNTDOWN
                      FIRST / INNERMOST LAYER
                  ================================== */}

                  <circle
                    className="countdown-background"
                    cx="180"
                    cy="180"
                    r="82"
                  />

                  <circle
                    className="countdown-progress"
                    cx="180"
                    cy="180"
                    r="82"
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset:
                        circumference -
                        circumference * progress,
                    }}
                  />


                  {/* =================================
                      2️⃣ BLUE CIRCLE
                      SECOND LAYER
                  ================================== */}

                  <circle
                    className="blue-circle"
                    cx="180"
                    cy="180"
                    r="103"
                  />


                  {/* =================================
                      3️⃣ SMALL DOT CIRCLE
                      THIRD LAYER
                  ================================== */}

                  <circle
                    className="dot-circle"
                    cx="180"
                    cy="180"
                    r="119"
                  />


                  {/* =================================
                      4️⃣ CYAN OUTER EFFECT
                  ================================== */}

                  <circle
                    className="cyan-circle"
                    cx="180"
                    cy="180"
                    r="137"
                  />


                  {/* =================================
                      5️⃣ PURPLE OUTER EFFECT
                  ================================== */}

                  <circle
                    className="purple-circle"
                    cx="180"
                    cy="180"
                    r="150"
                  />

                </svg>


                {/* =================================
                    ROTATING DOT GROUP 1
                ================================== */}

                <div className="rotating-dots dots-one">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>


                {/* =================================
                    ROTATING DOT GROUP 2
                ================================== */}

                <div className="rotating-dots dots-two">

                  <span></span>
                  <span></span>

                </div>


                {/* =================================
                    ROTATING DOT GROUP 3
                ================================== */}

                <div className="rotating-dots dots-three">

                  <span></span>

                </div>


                {/* =================================
                    CENTER
                ================================== */}

                <div className="center-circle">

                  <div className="center-glow"></div>

                  <span className="seconds">
                    {seconds}
                  </span>

                </div>

              </div>


              {/* =================================
                  CONTROL BUTTONS
              ================================== */}

              <div className="controls">

                <button
                  className="pause-button"
                  onClick={handlePauseResume}
                >

                  <span>
                    {running ? "Ⅱ" : "▶"}
                  </span>

                  {running ? "PAUSE" : "RESUME"}

                </button>


                <button
                  className="reset-button"
                  onClick={handleReset}
                >

                  <span>↻</span>

                  RESET

                </button>

              </div>

            </>

          ) : (


            /* =====================================
               COMING SOON
            ====================================== */

            <div className="coming-soon">

              <h2>
                COMING
                <br />
                <span>SOON</span>
              </h2>

              <p>
                SYSTEM SYNCHRONIZATION COMPLETE.
              </p>

              <button
                className="restart-button"
                onClick={handleReset}
              >
                ↻ RESTART
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;
