import { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import { nanoid } from 'nanoid'
import Landing from '../components/Landing'
import Question from '../components/Question'
import Answers from '../components/Answers'
import '../styles/App.css'

function App() {
  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [selectedAnswers, setSelectedAnwsers] = useState([])
  
  const test = nanoid()
  console.log(test)

  // Derived values
  const correctAnswers = triviaQuestions ? triviaQuestions.map(question => {return {id : question.id, correctAns: question.correct_answer}}) : ""
  console.log(correctAnswers)  


  // Get trivia questions from opentdb
  // parse data to usuable strings.
  function getTriviaQuestions() {
    try{
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(resp => resp.json())
    .then(data => {
      const dataWithShuffle = data.results.map(question => {
        // Parse the question and answers
        const parsedQuestion = parse(question.question);
        const parsedCorrectAnswer = parse(question.correct_answer);
        const parsedIncorrectAnswers = question.incorrect_answers.map(incorrect => parse(incorrect));

        // Shuffle the parsed answers
        const allAnswers = [...parsedIncorrectAnswers, parsedCorrectAnswer];
         // This is not truly random... but it works for now. Might revist
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
function getQuestions(){
  return triviaQuestions.map(question => {
    return (
      <>
        <Question key={nanoid()} question={question.question} />
        <div className="answers--container">
          <Answers handleChange={handleAnswerChange} id={question.id} question={question.question} selectedAnswers={question.question || ''} shuffleAnswers={question.shuffledAnswers}/>
        </div>
      </>
    )
  })
}



// Unsure if this is needed as of yet. We'll see... 
//  **Currently NOT implemented**
// is passed as a prop through...
function handleAnswerChange(id, answer) {
  setSelectedAnwsers((prev) => (
    [
    ...prev,
    { id: id,
      selectedAnswer: answer,} 
  ]
));
}
console.log(selectedAnswers)


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
