import { useState } from "react"
import { PonerSignos } from "./Botones"
import { NumerosPantalla } from "./Pantallita"
import { PantallaOperation } from "./TheOperation"
import "./Styles/calculator.sass"

const digitos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
const operations = ["+", "-", "×", "÷"]
var nTotalArray = []
var totalArrayMask = []
var theMask = ","
var whatOperation
var result //Contiene el numero entero con la máscara
var hayDosPuntos = false
var divideInCero = false

var savingValues = [null, null]

function doOperation(num1, num2, putResult, value, putMenos) {
    let resultOperation
    switch (value) {
        case "+":
            resultOperation = num1 + num2
            break

        case "-":
            resultOperation = num1 - num2
            break

        case "×":
            resultOperation = num1 * num2
            break

        case "÷":
            resultOperation = num1 / num2
            break
    }
    resultOperation = resultOperation.toString()
    resultOperation = resultOperation.split("")

    if (resultOperation.length > 16) {
        resultOperation.splice(16)
        resultOperation.push("...")
    }
    totalArrayMask = []
    nTotalArray = resultOperation

    resultOperation.forEach((element) => {
        mascara(element, putResult, true, putMenos)
    })
}

function mascara(valor, seeNum, resultado = false, putMenos) {
    var coma = 0
    var posComas = []
    var numeroAMover
    var maskLen

    //Añadiendo el valor a un nuevo array de los números pero con comas (o sea la máscara)
    if (valor != "-") {
        totalArrayMask.push(valor)
    } else {
        putMenos(true)
    }

    //Mientras que el resultado no necesite máscara lo pasamos com está
    if (nTotalArray.length < 4 && resultado == false || nTotalArray.includes(".")) {
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
    maskLen = totalArrayMask.length

    if (maskLen == 4 || maskLen == 8 || maskLen == 12 || maskLen == 16 || maskLen == 20) {
        numeroAMover = totalArrayMask[0]
        totalArrayMask.splice(0, 1)
        totalArrayMask.unshift(numeroAMover, theMask)
    }
    //Terminando configuración de la máscara

    result = totalArrayMask.join("")
    seeNum(result)
}

function Calculator() {
    const [nTotal, setNTotal] = useState("")
    const [igual, setIgual] = useState("")
    const [num1, setNum1] = useState("")
    const [num2, setNum2] = useState("")
    const [operation, setOperation] = useState("")
    const [putMenos, setPutMenos] = useState("")

    var eachSet = [setNTotal, setIgual, setNum1, setNum2, setOperation, setPutMenos]

    function readDigit(e) {
        let value = e.target.value

        //En caso de que se modifique el resultado
        if (igual == true && num1 != "" && num2 != "" && operation != "") {
            //En caso de que se vuelva a dar igual
            if (value == "=") {
                return
            }

            savingValues = [null, null]

            let valorInPantalla = nTotal
            eachSet.forEach(element => {
                element("")
            })
            setNTotal(valorInPantalla)

            if (nTotalArray.includes("...") || nTotalArray.includes(".")) {
                nTotalArray = []
                totalArrayMask = []
                result = totalArrayMask.join("")
                setNTotal(result)
            }
        }

        //Al dar igual...
        if (value == "=") {
            if (num1 == "") {
                return
            } else if (num1 != "" && nTotal == "") {
                return
            }

            if (nTotal == "0" && operation == "÷") {
                return alert("Error")
            }

            result = totalArrayMask.join("")
            savingValues[1] = nTotalArray.join("")
            setNum2(result)
            setIgual(true)

            doOperation(parseFloat(savingValues[0]), parseFloat(savingValues[1]), setNTotal, whatOperation, setPutMenos)
        }

        //Al dar CE...
        if (value == "CE") {
            eachSet.forEach(element => {
                nTotalArray = []
                totalArrayMask = []
                element("")
            })
            return
        }

        //Al borrar...
        //Borrando tanto el array con máscara como el del número entero
        if (value == "←") {
            //Esto es en caso que se quiera devolver el num1 que ya se ha puesto
            if (num1 != "" && nTotal == "") {
                let fragmentarNum1 = num1.split("")
                nTotalArray = fragmentarNum1
                nTotalArray.forEach((element, i) => {
                    if (element == theMask) {
                        nTotalArray.splice(i, 1)
                    }
                })
                fragmentarNum1 = num1.split("")

                totalArrayMask = fragmentarNum1
                result = totalArrayMask.join("")
                setNTotal(totalArrayMask)
                setOperation("")
                setNum1("")
                return
            }

            //Aquí empieza la eliminación normal

            //Esto de acá es para evitar un bug cuando el nTotalArray es 16 (o sea el máximo), ya que cuando se borraba cuando tenía 16 nums no dejaba poner de nuevo más números
            nTotalArray.pop()

            setIgual("")

            totalArrayMask.forEach((element, i) => {
                if (element == theMask && !totalArrayMask.includes(".")) {
                    var valLeft = totalArrayMask[i - 1]
                    totalArrayMask.splice(i - 1, 1, theMask)
                    totalArrayMask.splice(i, 1, valLeft)
                }
            })
            totalArrayMask.pop()

            if (totalArrayMask[0] == theMask) {
                totalArrayMask.shift()
            }

            result = totalArrayMask.join("")
            return setNTotal(result)
        }

        //Al ser una operación...
        operations.forEach(element => {
            if (value == element && nTotal != "" || value == element && num1 != "") {
                //En caso de que se ponga un signo cuando se puede visualizar el resultado
                if (nTotal.endsWith("...")){
                    return
                }

                result = totalArrayMask.join("")

                if (num1 == "" || igual == true) {
                    savingValues[0] = nTotalArray.join("")
                    setNum1(result)
                    setNum2("")
                    setIgual("")
                    setNTotal("")
                    nTotalArray = []
                    totalArrayMask = []
                }

                whatOperation = value
                return setOperation(value)
            }
        })

        //Al haber sido value un dígito para operar entonces se agrega en el total array
        digitos.forEach(element => {
            let searchTwoPoints = 0
            if (value == element && nTotalArray.length < 16) {
                nTotalArray.push(value)
                setIgual("")
            }

            if (nTotalArray[0] == ".") {
                searchTwoPoints += 1
            }

            for (let i = 0; i < nTotalArray.length; i++) {
                if (nTotalArray[i] == ".") {
                    searchTwoPoints += 1
                }
            }

            if (searchTwoPoints >= 2) {
                nTotalArray.pop()
                hayDosPuntos = true
            }
        })
        if (hayDosPuntos == true) {
            hayDosPuntos = false
            return
        }

        //Este es para quitar el igual al modificar el num en pantalla
        if (nTotal.length >= 19) {
            return
        }

        //Detectando que sea un dígito para mostrarlo
        digitos.forEach(element => {
            if (value == element) {
                mascara(value, setNTotal, false, setPutMenos)
            }
        })
    }


    return (
        <div className="calculator">
            <div className="pantalla">
                <NumerosPantalla activarIgual={igual} ponerMenos={putMenos} valorPuesto={nTotal} />
            </div>

            <div className="botones">
                <PonerSignos click={readDigit} />
            </div>

            <div className="operation">
                <PantallaOperation num1Style={savingValues[0] == null ? {color: "#848484"} : {color: "white"}} num2Style={savingValues[1] == null ? {color: "#848484"} : {color: "white"}} num1={savingValues[0] == null ? nTotal : num1} num2={savingValues[0] != null && savingValues[1] == null ? nTotal : num2} operation={operation} />
            </div>
        </div>
    )
}

export default Calculator