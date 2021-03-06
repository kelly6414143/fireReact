import React, { useState, useEffect } from 'react'

export default function InputItem(props) {

    const { label, type, placeholder, required, hasIcon, onChange, onBlur, valid, labelClassName} = props

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
        <div className="flex flex-row items-center my-6">
            {required && <span style={{ color: '#FF0000' }}>*</span>}
            <span className={`w-50 min-w-50 break-words mr-1 ${labelClassName}`}>{label}</span>
            <div className="relative flex">
                <input
                    style={{ border: !isValid ? '1px solid #FF0000' : '1px solid #DDDDDD', width: '300px', fontSize:'13px', padding: '10px 5px' }}
                    type={type === 'password' ? isOpen ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    onChange={(event) => { onChange(event.target.value); setVal(event.target.value) }}
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
                />
                {hasIcon && (
                    <span
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-sm"
                        style={{ color: 'rgb(98, 160, 211)' }}
                        onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? '??????' : '??????'}
                    </span>
                )}
                {required && (
                    <div className="absolute top-full left-1 text-sm text-red-500">
                        {isEmpty ? <span >{'???????????????'}</span> :
                            valid && !isValid && <span>{valid.msg || '????????????'}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
