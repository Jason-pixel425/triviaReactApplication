export default function Answers(props) {
    
    const answers = props.shuffleAnswers.map((answer, index) => {
        return (<>
            <input type="radio" id={`${props.id}-${index}`} onClick={() => props.handleChange(props.id, answer)} name={props.question} value={answer} />
            <label htmlFor={`${props.id}-${index}`}>{answer}</label>
        </>)
    })
    return answers
}