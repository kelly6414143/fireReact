import React, { useState, useEffect } from "react"
import InputItem from "../components/InputItem/InputItem"
import toast from "../components/Toast/Toast"
import Dialog from "../components/Dialog"

let validArr = []

export default function Login(props) {

    const { history } = props
    const [formObject, setFormObject] = useState({})

    //驗證器
    const [isFinishedValidtor, setIsFinishedValidtor] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [isShowValidtor, setIsShowValidtor] = useState(false)

    useEffect(() => {
        setFormObject({
            data: {
                username: "",
                password: "",
            },
            vaildator: {
                username: (el) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(el),
                password: (el) => /^[A-z]\d{2,6}[A-z]$/.test(el),
            },
            error: {}
        })
    }, [])

    useEffect(() => {
        isShowValidtor && createValidCode()
    }, [isShowValidtor])

    useEffect(() => {
        if (isValid) {
            const timer = setTimeout(() => {
                setIsShowValidtor(false)
                setIsFinishedValidtor(false)
                setIsValid(false)
                onLogin()
                clearTimeout(timer)
            }, 2000)
        }
    }, [isValid])

    const createValidCode = async() => {

        const validArr = await onHandleRandomVal()
        console.log('afteronHandleRandomVal')
        const parentNode = document.getElementById('valid_code')
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        div1.classList.add('w-50', 'h-50', 'rounded-full', 'bg-black', 'absolute', 'text-white', 'flex', 'justify-center', 'items-center', 'cursor-pointer')
        div2.classList.add('w-50', 'h-50', 'rounded-full', 'bg-black', 'absolute', 'text-white', 'flex', 'justify-center', 'items-center', 'cursor-pointer')
        div3.classList.add('w-50', 'h-50', 'rounded-full', 'bg-black', 'absolute', 'text-white', 'flex', 'justify-center', 'items-center', 'cursor-pointer')
        div1.style.top = '10%'
        div2.style.top = '30%'
        div3.style.top = 'calc(100% - 50px)'
        div1.style.right = '10%'
        div2.style.right = '80%'
        div3.style.right = '30%'
        div1.innerHTML = validArr[0]
        div2.innerHTML = validArr[1]
        div3.innerHTML = validArr[2]
        div1.addEventListener('click', (e) => getValidCodeVal(parentNode, div1, e))
        div2.addEventListener('click', (e) => getValidCodeVal(parentNode, div2, e))
        div3.addEventListener('click', (e) => getValidCodeVal(parentNode, div3, e))
        parentNode.appendChild(div1)
        parentNode.appendChild(div2)
        parentNode.appendChild(div3)
    }

    const onHandleRandomVal = () => new Promise((resolve)=>{
        let arr = []
        let map = new Map()

        while(arr.length < 3){
            const val = Math.ceil(Math.random() * 99)
            console.log(Math.ceil(Math.random()))
            if(!map.has(val)){
                map.set(val)
                arr.push(val)
            }
        }

        console.log('onHandleRandomVal', arr)  
        resolve(arr)
        console.log('finishedonHandleRandomVal')
    })

    const getValidCodeVal = (parentDom, dom) => {
        let isValid = false
        console.log('parentDom', parentDom, dom.innerText)
        validArr.push(parseFloat(dom.innerText))
        parentDom.removeChild(dom)
        console.log('validArr', validArr)
        if (validArr.length === 3) {
            for (let i = 0, len = validArr.length; i < len; i++) {
                if (validArr[i] > validArr[i + 1]) {
                    isValid = false
                    createValidCode()
                    break
                } else {
                    isValid = true
                    console.error('順序OK')
                }
            }
            setIsFinishedValidtor(true)
            setIsValid(isValid)
            validArr = []
            console.log('eeeeeeeeeeeee')
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        let isValid = await onValidtor()
        if (!isValid) return

        setIsShowValidtor(true)
    }

    const onValidtor = async () => {
        let errorObject = {}
        let isValid = true

        for (let i = 0, len = Object.keys(formObject.data).length; i < len; i++) {
            const el = Object.keys(formObject.data)[i]

            if (!formObject.data[el]) isValid = false

            if (formObject.vaildator[el] !== undefined && formObject.vaildator[el]) {
                errorObject[el] = formObject.vaildator[el](formObject.data[el])
            }
        }
        setFormObject({ ...formObject, error: { ...formObject.error, ...errorObject } })
        return Object.keys(errorObject).filter(el => !errorObject[el]).length === 0 && isValid
    }

    const onLogin = () => {
        fetch('/api/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify({
                username: formObject.data.username,
                password: formObject.data.password
            }),
        }).then(res => {
            return res.json()
        }).then(res => {
            if (res.success) {
                toast.success(res.message)
                sessionStorage.setItem('userToken', res.token)
                history.push('./')
            } else {
                toast.error(res.message)
            }
        }).catch(err => {
            console.error('err', err)
            toast.error(err.message)
            sessionStorage.removeItem('userToken')
        })
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mx-auto bg-white rounded-xl shadow-lg items-center max-w-1/2 flex flex-col justify-start">
                <header className="text-center text-xl font-bold">登入</header>
                <section className="mb-4 mt-6">
                    <InputItem
                        label="帳號"
                        type="text"
                        required={true}
                        placeholder={'必須是信箱'}
                        onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, username: val } })}
                        valid={{ msg: '必須是信箱', testVal: formObject?.vaildator?.['username'], isValid: formObject?.error?.['username'] }}
                    />
                    <InputItem
                        label="密碼"
                        type="password"
                        required={true}
                        hasIcon={true}
                        placeholder={'4-8字元；首尾必須是英文；中間必須是數字'}
                        onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, password: val } })}
                        valid={{ msg: '4-8字元；首尾必須是英文；中間必須是數字', testVal: formObject?.vaildator?.['password'], isValid: formObject?.error?.['password'] }}
                    />
                </section>
                <div className="flex flex-col justify-center">
                    <span
                        className="text-blue-500 m-1 text-center cursor-pointer underline"
                        style={{ textUnderlinePosition: 'under' }}
                        onClick={() => history.push('./register')}>註冊</span>
                    <button
                        className=" bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                        onClick={onSubmit}>登入</button>
                </div>
            </div>
            {
                isShowValidtor &&
                <Dialog>
                    <div id="valid_code" className="relative bg-white w-1/2 h-1/2">
                        {isFinishedValidtor && <span>{isValid ? '驗證成功' : '驗證失敗'}</span>}
                    </div>
                </Dialog>
            }
        </>
    );
}

