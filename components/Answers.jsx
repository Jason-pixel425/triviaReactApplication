export default function Answers(props) {
    
    const answers = props.shuffleAnswers.map((answer, index) => {
        return (<>
            <input type="radio" id={`${props.question}-${index}`} onClick={() => props.handleChange(props.question, answer)} name={props.question} value={answer} />
            <label htmlFor={`${props.question}-${index}`}>{answer}</label>
        </>)
    })
    return answers
}