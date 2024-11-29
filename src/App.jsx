import { useState, useEffect } from 'react'
import Landing from '../components/Landing'
import '../styles/App.css'

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([])


  function getTriviaQuestions() {
    try{
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setTriviaQuestions(data.results)
    })
    } catch(e){
      console.log(e)
    }
}
function getQuestions(){
  return triviaQuestions.map(question => {
    const answers = question.incorrect_answers.map(answer => {
      return <button name={question.question}>{answer}</button>
    })
    return (
      <>
      <label htmlFor={question.question}>{question.question}</label>
      {answers}
      </>
      
    )
  })
}
// {type: 'multiple',
//   difficulty: 'medium',
//   category: 'Sports',
//   question: 'Who won the 2015 College Football Playoff (CFP) National Championship? ',
//   correct_answer: 'Ohio State Buckeyes'}

  return (
    <>
      {triviaQuestions.length === 0 && <Landing handleClick={getTriviaQuestions}/>}
      {triviaQuestions.length > 0 && 
      <form>
        
        {getQuestions()}
      </form>}
    </>
  )
}

export default App
