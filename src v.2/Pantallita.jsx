import "./Styles/pantallita.sass"

export function NumerosPantalla({ valorPuesto, activarIgual, ponerMenos }) {
    return (<>
        <span id="setIgual" className="pantalla__span">
            {activarIgual != "" ? "=" : ""}
        </span>

        <span id="setMenos" className="pantalla__span">
            {ponerMenos != "" ? "-" : ""}
        </span>

        <span id="setNum" className="pantalla__span">
            {valorPuesto}
        </span>
    </>)
}