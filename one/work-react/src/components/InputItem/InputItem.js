import React, { useState, useEffect } from 'react'
import './inputItem.css'

export default function InputItem(props) {

    const { label, type, required, onChange, valid } = props

    const [isValid, setIsValid] = useState(true)

    return (
        <div className="input_item flex-row">
            {required && <span style={{ color: '#FF0000' }}>+</span>}
            <span className="input_label">{label}</span>
            <div className="input_value">
                <input
                    type={type}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={(event) => {
                        console.log('blur')
                        required && setIsValid(valid && valid.testVal.test(event.target.value))
                    }}
                    style={{ borderColor: !isValid && '#FF0000' }}
                />
                {required && valid && !isValid && <span style={{color: '#FF0000'}}>{valid.msg || '驗證錯誤囉'}</span>}
            </div>
        </div>
    );
}
