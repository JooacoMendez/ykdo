import { useState, useEffect } from "react"
import validator from 'validator'
import "./App.css"

function App() {

  const [running, setRunning] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  function startTimer() {
    setRunning(true)
  }

  function stopTimer() {
    setRunning(false)
  }

  function handleKeyDown(e, setValue, maxLimit) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setValue((prev) => Math.min(prev + 1, maxLimit));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setValue((prev) => Math.max(prev - 1, 0));
    }
  }

  useEffect(() => {
    if (!running) return

    if (minutes <= 0 && seconds <= 0) {
      stopTimer()
      return
    }

    const timerId = setTimeout(() => {
      if (seconds === 0) {
        setMinutes((prev) => prev - 1)
        setSeconds(59)
      } else {
        setSeconds((prev) => prev - 1)
      }
    }, 1000)

    return () => clearTimeout(timerId)
  }, [running, minutes, seconds])

  return (
    <main className="container">
      <h1>Time</h1>

      <div className="row">
        <input className="timeInput" type="text" value={String(minutes).padStart(2, '0')} onChange={(e) => setMinutes(validator.isInt(e.target.value, { min: 0, max: 480 }) ? parseInt(e.target.value) : Math.min(parseInt(e.target.value) || 0, 480))} onKeyDown={(e) => handleKeyDown(e, setMinutes, 480)} disabled={running} />
        <span>:</span>
        <input className="timeInput" type="text" value={String(seconds).padStart(2, '0')} onChange={(e) => setSeconds(validator.isInt(e.target.value, { min: 0, max: 59 }) ? parseInt(e.target.value) : Math.min(parseInt(e.target.value) || 0, 59))} onKeyDown={(e) => handleKeyDown(e, setSeconds, 59)} disabled={running} />
      </div>

      <div className="row-btn">
        <button className="startBtn" onClick={startTimer}>Start</button>
        <button className="stopBtn" onClick={stopTimer}>Stop</button>
      </div>
    </main>
  )
}

export default App
