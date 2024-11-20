import { useState } from 'react'
import Landing from '../components/Landing'
import '../styles/App.css'

function App() {
  const [startQuiz, setStartQuiz] = useState(false)

  return (
    <>
      <Landing />
    </>
  )
}

export default App
