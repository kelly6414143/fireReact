import React from "react"

export const devConsole = (...parameter) => {
    if (process.env.NODE_ENV === "development") {
        console.log(...parameter)
    }
}

export const createClassName = (param) => {
    let tempArr = []
    Object.keys(param).forEach((el, index)=>{
        if(param[el]) {
            tempArr.push(el)
        }
    })
    return tempArr.join(' ')
}



export default{
    devConsole : devConsole,
    createClassName : createClassName
}