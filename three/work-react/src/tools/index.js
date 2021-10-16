import React from "react"
import { useContextSelector } from "use-context-selector";

export const devConsole = (...parameter) => {
    if (process.env.NODE_ENV === "development") {
        console.log(...parameter)
    }
}

export const createClassName = (param) => {
    let tempArr = []
    Object.keys(param).forEach((el, index) => {
        if (param[el]) {
            tempArr.push(el)
        }
    })
    return tempArr.join(' ')
}

export const createContext = (context) => Component => {
    function Test(props) {
        const state = useContextSelector(context, state => state)
        return <Component {...props} {...state}></Component>
    }
    return Test
}



export default {
    devConsole: devConsole,
    createClassName: createClassName
}