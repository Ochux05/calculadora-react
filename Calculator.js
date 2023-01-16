import { useState } from "react"
import "./style.css"
import { PonerSignos } from "./Botones"
import { NumerosPantalla } from "./Pantallita"

const digitos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
var nTotalArray = []
var totalArrayMask = []
var theMask = ","
var posComas = []
var coma = 0
var result

function mascara(valor, seeNum, numTotal) {
    var numeroAMover
    var maskLen

    totalArrayMask.push(valor)

    if (nTotalArray.length < 4) {
        result = totalArrayMask.join("")
        seeNum(result)
        return
    }

    //Agregando configuración de mascara
    totalArrayMask.forEach((element, i) => {
        if (element == theMask) {
            numeroAMover = totalArrayMask[i + 1]
            totalArrayMask.splice(i, 1, numeroAMover)
            coma = i + 1
            posComas.push(coma)
        }
    });

    for (let i = 0; i < posComas.length; i++) {
        totalArrayMask.splice(posComas[i], 1, theMask)
    }
    posComas = []
    maskLen = totalArrayMask.length

    if (maskLen == 4 || maskLen == 8 || maskLen == 12 || maskLen == 16) {
        numeroAMover = totalArrayMask[0]
        totalArrayMask.splice(0, 1)
        totalArrayMask.unshift(numeroAMover, theMask)
    }
    //Terminando configuración de la máscara

    result = totalArrayMask.join("")
    return seeNum(result)
}

function Calculator() {
    const [nTotal, setNTotal] = useState("")
    const [igual, setIgual] = useState(false)

    function readDigit(e) {
        let value = e.target.value

        if (value == "=") {
            return setIgual(true)
        }

        if (value == "←") {
            nTotalArray.pop()
            totalArrayMask.pop()
            setIgual(false)

            totalArrayMask.forEach((element, i) => {
                if (element == theMask) {
                    var valLeft = totalArrayMask[i - 1]
                    totalArrayMask.splice(i - 1, 1, theMask)
                    totalArrayMask.splice(i, 1, valLeft)
                }
            })

            if (totalArrayMask[0] == theMask) {
                totalArrayMask.shift()
            }

            result = totalArrayMask.join("")
            return setNTotal(result)
        }
        nTotalArray.push(value)

        if (nTotalArray.length >= 16) {
            return
        }

        //Detectando que sea un dígito para mostrarlo
        for (let i = 0; i < digitos.length; i++) {
            if (value == digitos[i]) {
                return mascara(value, setNTotal)
            }
        }
    }


    return (
        <div className="calculator">
            <div className="pantalla">
                <NumerosPantalla activarIgual={igual} valorPuesto={nTotal} />
            </div>

            <div className="botones">
                <PonerSignos click={readDigit} />
            </div>
        </div>
    )
}

export default Calculator