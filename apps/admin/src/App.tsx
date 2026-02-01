import './App.css'

function App() {
  fetch("https://faqs-accordion-api.onrender.com/health")
    .then((r) => r.json())
    .then(console.log)
    .catch(console.error);
  return (
    <>
      <h1>Admin Site</h1>
    </>
  )
}

export default App
