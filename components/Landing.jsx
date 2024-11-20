import '../styles/Landing.css'


export default function Landing(props) {
    return (
        <section className="Landing--section">
            <h1>Quizzical</h1>
            <h2>Test your knowledge with some trivia</h2>
            <button onClick={props.handleClick}>Start Quiz</button>
        </section>
    )
}