export default function Answers(props) {
    
    const answers = props.shuffleAnswers.map((answer, index) => {
        return (<>
            <input type="radio" id={answer} name={props.question} value={answer} />
            <label htmlFor={answer}>{answer}</label>
        </>)
    })
    return answers
}