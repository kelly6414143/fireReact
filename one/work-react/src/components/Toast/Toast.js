import React from "react";
import ReactDOM from 'react-dom';
import './toast.css'

let timer = null

function SuccessToast({ msg }) {
    return (
        <div className={'toast_wrapper'}>
            <span className={'toast_icon'} />
            <div>{msg}</div>
        </div>
    );
}

function ErrorToast({ msg }) {
    return (
        <div className={'toast_wrapper'}>
            <span className={'toast_icon'} style={{ backgroundColor: '#FF0000' }} />
            <div>{msg}</div>
        </div>
    );
}

function addSuccessToast(type, msg, duration = 2000) {
    const containerDiv = document.createElement('div');
    const parentDom = document.getElementById('toast')
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
    timer = setTimeout(() => {
        parentDom.removeChild(containerDiv)
        // TODO 多個toast時toast無法消失
        // clearTimeout(timer)
    }, duration)
}

export default {
    success: (msg, duration) => addSuccessToast('success', msg, duration),
    error: (msg, duration) => addSuccessToast('error', msg, duration)
}