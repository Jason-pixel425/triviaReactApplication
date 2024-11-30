import { useState, useEffect } from 'react'
import Landing from '../components/Landing'
import Question from '../components/Question'
import Answers from '../components/Answers'
import '../styles/App.css'

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [selectedAnswers, setSelectedAnsers] = useState([])
  

  // Derived values
  const correctAnswers = triviaQuestions ? triviaQuestions.map(question => question.correct_answer) : ""
  console.log(correctAnswers)


  // This is not truly random... but it works for now. Might revist
  function shuffleAnswers(question){
    const allAnswers = [
      ...question.incorrect_answers,
      question.correct_answer
    ]
    const answersShuffled = allAnswers.sort((a, b) => 0.5 - Math.random());
    return answersShuffled
  } 

  // Get trivia questions from opentdb and call shuffleAnswers to add shuffledAnswers to question properties
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

//Render questions and answers to page
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

// Unsure if this is needed as of yet. We'll see... 
//  **Currently NOT implemented**
// is passed as a prop through...
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
