import "./Styles/botones.sass"

export function PonerSignos({ click }) {
    const signos = ["7", "8", "9", "÷", "6", "5", "4", "×", "3", "2", "1", "-", "←", "0", "CE", "+", ".", "="]

    var putSpace = -1

    //Poniendo saltos para los botones y agregandolos
    const listaSignos = signos.map(signo => {
        putSpace++;

        if (putSpace > 3) {
            putSpace = 0;
        }

        return (
            <li className="botones__li" key={signo.toString()}>

                <input
                    onClick={click}

                    type="submit"

                    value={signo}

                    id={signo == "=" ? "igual" : signo + "id"}

                    operators={signo == "×" || signo == "+" || signo == "-" || signo == "÷" ? "true" : "false"}

                    deletes={signo == "CE" || signo == "←" ? "true" : "false"}
                />

                {putSpace == 3 ? <br /> : ""}
            </li>
        )
    })

    return listaSignos
}