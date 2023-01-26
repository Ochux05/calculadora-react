import React from "react"
import ReactDOM from "react-dom/client"
import Calculator from "./Calculator"

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
        <>
        <div style={{
                padding: 0,
                margin: 0
        }}>
                <Calculator />
        </div>
        </>
)