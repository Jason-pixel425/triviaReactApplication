import clsx from 'clsx'
export default function Answers(props) {
    
    const answers = props.shuffleAnswers.map((answer, index) => {
        const isSelected = props.selectedAnswers.some(correctAns =>  props.id === correctAns.id && correctAns.selectedAnswer === answer)
        const isCorrect = isSelected ? props.selectedAnswers.find(correctAnswer => correctAnswer.id === props.id).selectedAnswer === props.correctAnswer : false;
        const isCorrentNotSelected = !isSelected ? answer === props.correctAnswer :  false

        const styles = clsx({
            neutral: props.isQuizOver && !isCorrect && !isCorrentNotSelected,
            correct: props.isQuizOver && isCorrect,
            incorrect: props.isQuizOver && !isCorrect && isSelected,
            highlightCorrect: props.isQuizOver && isCorrentNotSelected
        })


        return (<>
            <input type="radio" id={`${props.id}-${index}`} 
                    disabled={props.isQuizOver} 
                    onClick={() => props.handleChange(props.id, answer)} 
                    name={props.question} value={answer} />

            <label className={styles} htmlFor={`${props.id}-${index}`}>{answer}</label>
        </>)
    })
    return answers
}