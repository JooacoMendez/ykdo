import { useState, useEffect } from "react"
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
        <input className="timeInput" type="number" name="" id="" min={0} max={480} step={1} placeholder="00" value={minutes} onChange={(e) => setMinutes(e.target.value)} disabled={running} />
        <span>:</span>
        <input className="timeInput" type="number" name="" id="" min={0} max={59} step={1} placeholder="00" value={seconds} onChange={(e) => setSeconds(e.target.value)} disabled={running} />
      </div>

      <div className="row">
        <button className="startBtn" onClick={startTimer}>Start</button>
        <button className="stopBtn" onClick={stopTimer}>Stop</button>
      </div>
    </main>
  )
}

export default App
