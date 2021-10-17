import React from "react"
import { useContextSelector } from "use-context-selector";

export const devConsole = (...parameter:any[]) => {
    if (process.env.NODE_ENV === "development") {
        console.log(...parameter)
    }
}

export const createClassName = (param:{[index:string]:any}) => {
    let tempArr:string[] = []
    Object.keys(param).forEach((el, index) => {
        if (param[el]) {
            tempArr.push(el)
        }
    })
    return tempArr.join(' ')
}

// export const createContext = (context:{[index:string]}) => Component => {
//     function Test(props:{}) {
//         const state = useContextSelector(context, state => state)
//         return <Component {...props} {...state}></Component>
//     }
//     return Test
// }



export default {
    devConsole: devConsole,
    createClassName: createClassName
}