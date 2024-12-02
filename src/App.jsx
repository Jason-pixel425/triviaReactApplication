import { useState, useEffect, useRef } from 'react'
import parse from 'html-react-parser'
import { nanoid } from 'nanoid'
import Landing from '../components/Landing'
import Question from '../components/Question'
import Answers from '../components/Answers'
import QuizOver from '../components/QuizOver'
import '../styles/App.css'

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [selectedAnswers, setSelectedAnwsers] = useState([])
  const [quizOver, setQuizOver] = useState(false)
  const formRef = useRef(null)
  


  // Derived values
  const correctAnswers = triviaQuestions ? triviaQuestions.map(question => {return {id : question.id, correct: question.correct_answer}}) : ""
  const isAllAnswered = selectedAnswers.length === correctAnswers.length
  const selectedCorrectAnsArr =  selectedAnswers.filter(answer => 
    correctAnswers.some(correctAn => correctAn.id === answer.id ? correctAn.correct === answer.selectedAnswer : false))
  const numberOfCorrect = selectedCorrectAnsArr.length
  const numberOfQuestions = correctAnswers.length
  console.log(correctAnswers)


  // Get trivia questions from opentdb
  // parse data to usuable strings.
  function getTriviaQuestions() {
    try{
    fetch('https://opentdb.com/api.php?amount=5&category=27&difficulty=hard&type=multiple')
    .then(resp => resp.json())
    .then(data => {
      const dataWithShuffle = data.results.map(question => {
        // Parse the question and answers
        const parsedQuestion = parse(question.question);
        const parsedCorrectAnswer = parse(question.correct_answer);
        const parsedIncorrectAnswers = question.incorrect_answers.map(incorrect => parse(incorrect));

        // Shuffle the parsed answers
        const allAnswers = [...parsedIncorrectAnswers, parsedCorrectAnswer];
         // This is not truly random (or so I've heard)... but it works for now. Might revist
        const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
        const id = nanoid()
        return {
          ...question,
          question: parsedQuestion,
          correct_answer: parsedCorrectAnswer,
          incorrect_answers: parsedIncorrectAnswers,
          shuffledAnswers: shuffledAnswers,
          id: id
        }
      })
      setTriviaQuestions(dataWithShuffle)
    
    })
    } catch(e){
      console.log(e)
    }
}

//Render questions and answers to page
//Question component is just returning a <h2>. Could remove this, just have a <h2> where the Question is.
function getQuestions(){
  return triviaQuestions.map(question => {
    return (
      <>
        <Question key={nanoid()} question={question.question} />
        <div className="answers--container">
          <Answers handleChange={handleAnswerChange} isQuizOver={quizOver} id={question.id} question={question.question} selectedAnswers={question.question || ''} shuffleAnswers={question.shuffledAnswers}/>
          
        </div>
        <hr />
      </>
    )
  })
}

// pass the is gameOver prop to answers component and use clsx to conditionally add classes to correct, incorrect and neutral (becuase of gamestate change)
// Easiest way I can think of is to make a state tracking if quiz is submitted
//pass the correct answer from the api return || check if there is a property for "checked"

function handleSubmit(e) {
  e.preventDefault()
  setQuizOver(true)

}


// Reset form, reset states, get new questions.
function handleNewQuiz() {
  console.log("hi")
  formRef.current ? formRef.current.reset() : null
  setQuizOver(false)
  getTriviaQuestions()
  setSelectedAnwsers([])
}

function handleAnswerChange(id, answer) {
  setSelectedAnwsers((prev) => {
    const updatedArr = prev.map(ans => {
      return ans.id === id ? {id: id, selectedAnswer: answer} : ans
    })
    const checkIfUpdated = updatedArr.some(ans => ans.id === id)
    return checkIfUpdated ? updatedArr : [...updatedArr, { id, selectedAnswer: answer }];
  });
}

console.log(selectedAnswers)
  return (
    <>
      {triviaQuestions.length === 0 && <Landing handleClick={getTriviaQuestions}/>}
      {triviaQuestions.length > 0 && 
      <form ref={formRef} onSubmit={handleSubmit}>
        {getQuestions()}
        {isAllAnswered && !quizOver  ? <button>submit</button> : null}
      </form>}
      {quizOver ? <QuizOver numCorrect={numberOfCorrect} handleClick={handleNewQuiz} quizLength={numberOfQuestions} /> : null}

    </>
  )
}

export default App
