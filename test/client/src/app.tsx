import { useEffect } from "preact/hooks"

import './app.css'

export function App() {

  useEffect(() => {
    fetch("http://localhost:5000/", {
      method: "POST",
      body: JSON.stringify({
        hello: "world!"
      })
    })
    .then(res => res.text())
    .then(text => console.log(text))
  }, [])

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}
