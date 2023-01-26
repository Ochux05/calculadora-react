import "./Styles/operation.sass"

export function PantallaOperation(props) {
    return (
        <>
            <span style={props.num1Style} className="operation__span"
            id="num1">{props.num1}</span>
            <span className="operation__span" id="signo">{props.operation}</span>
            <span style={props.num2Style} className="operation__span" id="num2">{props.num2}</span>
        </>
    )
}