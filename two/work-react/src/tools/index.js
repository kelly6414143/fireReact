export const devConsole = (...parameter) => {
    if(process.env.NODE_ENV === "development"){
        console.log(...parameter)
    }
}

