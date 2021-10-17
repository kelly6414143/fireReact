import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog"
import {devConsole} from "@/tools/index"

let validArr = []

export default function Validator({
    isShowDialog,
    onSuccessCallback,
    onHandleClose,
    contentClassName
}) {

    const [isFinishedValidator, setIsFinishedValidator] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [isShowValidator, setIsShowValidator] = useState(false)
    const [compareMethod, setCompareMethod] = useState(1) //1: 由小到大 2: 由大到小

    useEffect(() => {
        setIsShowValidator(isShowDialog)
    }, [isShowDialog])

    useEffect(()=>{
        isShowValidator && createValidCode()
    }, [isShowValidator])

    useEffect(() => {
        if (isValid) {
            const timer = setTimeout(() => {
                setIsShowValidator(false)
                setIsFinishedValidator(false)
                setIsValid(false)
                onSuccessCallback()
                clearTimeout(timer)
            }, 2000)
        }
    }, [isValid])

    const createValidCode = async () => {
        const validArr = await onHandleRandomVal()
        const tempCompareMethod = Math.ceil(Math.random() * 2)
        const parentNode = document.getElementById('valid_code')
        devConsole(parentNode)
        const effectiveTop = parentNode.clientHeight - 50
        const effectiveLeft = parentNode.clientWidth - 50
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        div1.classList.add('w-50', 'h-50', 'rounded-full', 'bg-black', 'absolute', 'text-white', 'flex', 'justify-center', 'items-center', 'cursor-pointer')
        div2.classList.add('w-50', 'h-50', 'rounded-full', 'bg-black', 'absolute', 'text-white', 'flex', 'justify-center', 'items-center', 'cursor-pointer')
        div3.classList.add('w-50', 'h-50', 'rounded-full', 'bg-black', 'absolute', 'text-white', 'flex', 'justify-center', 'items-center', 'cursor-pointer')
        div1.style.top = Math.ceil(Math.random() * effectiveTop) + 'px'
        div2.style.top = Math.ceil(Math.random() * effectiveTop) + 'px'
        div3.style.top = Math.ceil(Math.random() * effectiveTop) + 'px'
        div1.style.left = Math.ceil(Math.random() * effectiveLeft) + 'px'
        div2.style.left = Math.ceil(Math.random() * effectiveLeft) + 'px'
        div3.style.left = Math.ceil(Math.random() * effectiveLeft) + 'px'
        div1.innerHTML = validArr[0]
        div2.innerHTML = validArr[1]
        div3.innerHTML = validArr[2]
        div1.addEventListener('click', (e) => getValidCodeVal(parentNode, div1, tempCompareMethod))
        div2.addEventListener('click', (e) => getValidCodeVal(parentNode, div2, tempCompareMethod))
        div3.addEventListener('click', (e) => getValidCodeVal(parentNode, div3, tempCompareMethod))
        parentNode.appendChild(div1)
        parentNode.appendChild(div2)
        parentNode.appendChild(div3)
        setCompareMethod(tempCompareMethod)
    }

    const onHandleRandomVal = () => new Promise((resolve) => {
        let arr = []
        let map = new Map()

        while (arr.length < 3) {
            const val = Math.ceil(Math.random() * 99)
            if (!map.has(val)) {
                map.set(val)
                arr.push(val)
            }
        }
        resolve(arr)
    })

    const getValidCodeVal = (parentDom, dom, method) => {
        let isValid = false
        validArr.push(parseFloat(dom.innerText))
        parentDom.removeChild(dom)
        if (validArr.length === 3) {
            for (let i = 0, len = validArr.length; i < len; i++) {
                if (method === 1) {
                    if (validArr[i] > validArr[i + 1]) {
                        isValid = false
                        break
                    } else {
                        isValid = true
                    }
                } else {
                    if (validArr[i] < validArr[i + 1]) {
                        isValid = false
                        break
                    } else {
                        isValid = true
                    }
                }
            }
            setIsFinishedValidator(true)
            setIsValid(isValid)
            validArr = []

            if (!isValid) {
                const timer = setTimeout(() => {
                    createValidCode()
                    setIsFinishedValidator(false)
                    clearTimeout(timer)
                }, 1000)
            }
        }
    }

    return (
        <SimpleDialog
            isShowDialog={isShowValidator}
            onHandleClose={onHandleClose}
            contentClassName={contentClassName}
        >
            <>
                <div id="valid_code" className="relative w-full h-full">
                    {isFinishedValidator && (
                        <div className={`w-full h-full rounded-t-xl ${isValid ? 'bg-green-500' : 'bg-red-500'} flex justify-center items-center animate-pulse`}>
                            <span className="text-white text-xl font-bold tracking-widest">{isValid ? '驗證成功' : '驗證失敗'}</span>
                        </div>
                    )}
                </div>
                <div>{compareMethod === 1 ? '請由數字最小點到最大' : '請由數字最大點到最小'}</div>
            </>
        </SimpleDialog>
    );
}
