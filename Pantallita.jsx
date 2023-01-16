export function NumerosPantalla({valorPuesto, activarIgual}) {
    return (<>
        <span>{activarIgual ? "=" : ""}</span><span>{valorPuesto}</span>
    </>)
}