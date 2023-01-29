import React from "react"
import './public/App.css'

function App() {

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/", {
      method: "POST",
      body: "sex"
    })
    .then(res => res.text())
    .then(restText => console.log(restText))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Introduce un nombre</label><br/>
        <input type="text" placeholder={"Juanjo Hernandez"}/><br/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
