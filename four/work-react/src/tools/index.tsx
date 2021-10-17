import React, { ReactNode } from "react"
import { useContextSelector } from "use-context-selector";

interface IProps {
    history: { [index: string]: any };
    routes: { [index: string]: any };
    children: ReactNode;
    setUserInfo: ({}) => void;
    getUserInfo: {[index:string]:any};
}

export const devConsole = (...parameter: any[]) => {
    if (process.env.NODE_ENV === "development") {
        console.log(...parameter)
    }
}

export const createClassName = (param: { [index: string]: any }) => {
    let tempArr: string[] = []
    Object.keys(param).forEach((el, index) => {
        if (param[el]) {
            tempArr.push(el)
        }
    })
    return tempArr.join(' ')
}

export const createContext = (context: any) => (Component: React.FC<IProps>) => {
    function Test(props: IProps) {
        const state = useContextSelector(context, state => state)
        return <Component {...props} {...state} />
    }
    return Test
}


export default {
    devConsole: devConsole,
    createClassName: createClassName
}