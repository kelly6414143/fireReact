import React, { useState, useEffect } from 'react'
import './inputItem.css'

export default function InputItem(props) {

    const { label, type, placeholder, required, hasIcon, onChange, onBlur, valid } = props

    const [isValid, setIsValid] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [val, setVal] = useState("")

    useEffect(() => {
        if (valid?.isValid === undefined) return
        setIsEmpty(!val)
        setIsValid(valid?.isValid || valid && valid.testVal && valid.testVal(val))
    }, [valid])

    return (
        <div className="input_item flex-row">
            {required && <span style={{ color: '#FF0000' }}>*</span>}
            <span className="input_label">{label}</span>
            <div className="input_value">
                <input
                    type={type === 'password' ? isOpen ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    onChange={(event) => {onChange(event.target.value); setVal(event.target.value)}}
                    onBlur={(event) => {
                        if (!required) return
                        if (!event.target.value) {
                            setIsEmpty(true)
                            setIsValid(false)
                        } else {
                            let isCheck = true
                            if (onBlur) {
                                isCheck = onBlur(event.target.value)
                            } else {
                                isCheck = valid && valid.testVal ? valid.testVal(event.target.value) : true
                            }

                            setIsEmpty(false)
                            setIsValid(isCheck)
                        }
                    }}
                    style={{ border: !isValid && '2px solid #FF0000', width: '300px', padding: '10px 5px' }}
                />
                {hasIcon && (
                    <span className={'icon_word'} onClick={() => setIsOpen(!isOpen)}> {isOpen ? '隱藏' : '顯示'}</span>
                )}
                {required && (
                    <div className={'valid_msg'}>
                        {isEmpty ? <span >{'請輸入內容'}</span> :
                            valid && !isValid && <span>{valid.msg || '格式有誤'}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
