import { useState } from 'react'
import Landing from '../components/Landing'
import '../styles/App.css'

function App() {
  const [startQuiz, setStartQuiz] = useState(false)

  function startQuestions(){
    setStartQuiz(true);
  }


  return (
    <>
      {!startQuiz && <Landing handleClick={startQuestions} />}
    </>
  )
}

export default App
