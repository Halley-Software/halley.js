import './App.css'

function App() {

  fetch("http://localhost:5000/")
  .then(res => res.text())
  .then(restText => console.log(restText))

  return (
    <div>

    </div>
  )
}

export default App
