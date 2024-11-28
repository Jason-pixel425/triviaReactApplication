import { useState, useEffect } from 'react'
import Landing from '../components/Landing'
import '../styles/App.css'

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([])


  function getTriviaQuestions() {
    try{
    fetch('https://opentdb.com/api.php?amount=10')
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setTriviaQuestions(data.results)
    })
    } catch(e){
      console.log(e)
    }
}

  return (
    <>
      {triviaQuestions.length === 0 && <Landing handleClick={getTriviaQuestions}/>}
    </>
  )
}

export default App
