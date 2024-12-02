export default function QuizOver(props){
    console.log(props)
    return (
        
        <section className="section--score">
            <h3 className="quizScore">You scored {props.numCorrect} / {props.quizLength}</h3>
            <button className="btn--small" onClick={props.handleClick} disabled={false}>Play again</button>
        </section>
        
    )
}