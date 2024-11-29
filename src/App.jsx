import { useState, useEffect } from 'react'
import Landing from '../components/Landing'
import Question from '../components/Question'
import Answers from '../components/Answers'
import '../styles/App.css'

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [selectedAnswers, setSelectedAnsers] = useState([])
  
  const correctAnswers = triviaQuestions ? triviaQuestions.map(question => question.correct_answer) : ""
  console.log(correctAnswers)

  function shuffleAnswers(question){
    const allAnswers = [
      ...question.incorrect_answers,
      question.correct_answer
    ]
    const answersShuffled = allAnswers.sort((a, b) => 0.5 - Math.random());
    return answersShuffled
  } 

  function getTriviaQuestions() {
    try{
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      const dataWithShuffle = data.results.map(question => {
        return {
          ...question,
          shuffledAnswers : shuffleAnswers(question)
        }
      })
      setTriviaQuestions(dataWithShuffle)
    
    })
    } catch(e){
      console.log(e)
    }
}
function getQuestions(){
  return triviaQuestions.map(question => {
    return (
      <>
        <Question question={question.question} />
        <div className="answers--container">
          <Answers handleChange={handleAnswerChange} question={question.question} shuffleAnswers={question.shuffledAnswers}/>
        </div>
      </>
    )
  })
}

function handleAnswerChange(question, value) {
  setSelectedAnsers(prevSelected => {
    return [
      ...prevSelected,
      {
        question: {question},
        value: {value}
      }
    
    ]
  })
  console.log(selectedAnswers)  
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
        <button>submit</button>
      </form>}
    </>
  )
}

export default App
