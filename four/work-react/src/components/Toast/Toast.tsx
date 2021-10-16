import React, { ReactNode } from "react";
import ReactDOM from 'react-dom';
import './toast.css'

interface Imsg {
    msg: string
}

interface Itoast {
    type: string;
    msg: string;
    duration?: number
}

interface INode {
    style: {};
    appendChild: () => {};
}

type IDom = ReactNode

type TDom = IDom | null

function SuccessToast({ msg }: Imsg) {
    return (
        <div className={'toast_wrapper'}>
            <span className={'toast_icon'} />
            <div>{msg}</div>
        </div>
    );
}

function ErrorToast({ msg }: Imsg) {
    return (
        <div className={'toast_wrapper'}>
            <span className={'toast_icon'} style={{ backgroundColor: '#FF0000' }} />
            <div>{msg}</div>
        </div>
    );
}

function addToast({ type, msg, duration = 2000 }: Itoast) {
    const containerDiv = document.createElement('div');
    const parentDom: any = document.getElementById('toast')
    parentDom.style.animationDuration = (duration / 1000) + 's'
    parentDom.appendChild(containerDiv);

    // 這裏返回的是對該元件的引用 
    switch (type) {
        case 'success':
            ReactDOM.render(<SuccessToast msg={msg} />, containerDiv);
            break
        case 'error':
            ReactDOM.render(<ErrorToast msg={msg} />, containerDiv);
            break
        default:
            ReactDOM.render(<SuccessToast msg={msg} />, containerDiv);
            break
    }
    const timer = setTimeout(() => {
        parentDom.removeChild(containerDiv)
        clearTimeout(timer)
    }, duration)
}

export default {
    success: (msg: string, duration?: number) => addToast({ type: 'success', msg, duration }),
    error: (msg: string, duration?: number) => addToast({ type: 'error', msg, duration })
}