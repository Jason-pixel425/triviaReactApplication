export default function QuizOver(props){
    console.log(props)
    return (
        <>
        <h3>You scored {props.numCorrect} / {props.quizLength}</h3>
        <button onClick={props.handleClick} disabled={false}>ClickMe</button>
        </>
    )
}