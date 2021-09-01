import React from 'react'

export default function InputItem(props) {

    const { label, type, required, onChange } = props

    return (
        <div>
            {required && <span>+</span>}
            <span>{label}</span>
            <input type={type} onChange={(event) => onChange(event.target.value)} />
        </div>

    );
}
