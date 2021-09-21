import React, { useState, useEffect } from 'react'

export default function Input(props) {

    const { value, label, required, placeholder, onChange, labelClassName, err } = props

    return (
        <div className="flex flex-row items-center justify-between my-6">
            <div>
                {required && <span style={{ color: '#FF0000' }}>*</span>}
                <span className={`min-w-50 break-words mr-1 ${labelClassName}`}>{label}</span>
            </div>
            <div className="relative flex">
                <input
                    value={value || ""}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={{ border: err ? '1px solid #FF0000' : '1px solid #DDDDDD', width: '300px', fontSize: '13px', padding: '10px 5px' }}
                />
                {
                    err && <div className="absolute top-full left-1 text-sm text-red-500">
                        <span>{err}</span>
                    </div>
                }
            </div>
        </div>
    );
}
