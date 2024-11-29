export default function Question(props) {
    

    return (
        <>        
            <label>{props.question}</label>
            <input type="radio" name={props.question} />
        </>
    )
}