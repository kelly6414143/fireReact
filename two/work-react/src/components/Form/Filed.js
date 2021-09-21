import React, {useState, useEffect, useCallback} from "react"
import { useContextSelector } from 'use-context-selector';
import FieldContext from "@/stores/FieldContext"

export default function Field (props){

    const {
        name,
        rules,
        children
    } = props

    const [, updateState] = useState(null)
    
    const forceUpdate = useCallback(()=> updateState({}, []))

    const getFieldValue = useContextSelector(FieldContext, state => state.getFieldValue);
    const setFieldsValue = useContextSelector(FieldContext, state => state.setFieldsValue);
    const registerFieldEntities = useContextSelector(FieldContext, state => state.registerFieldEntities);
    const getInputErr = useContextSelector(FieldContext, state => state.getInputErr);
    const validateField = useContextSelector(FieldContext, state => state.validateField);
    let unregister = null

    useEffect(()=>{
        unregister = registerFieldEntities({...props, onStoreChange})

        return ()=>{
            unregister()
        }
    },[])

    const getControlled = () => {
        return {
            value: getFieldValue(name), //get
            onChange: (e) => {
                const newValue = e.target.value
                //set
                setFieldsValue({
                    [name]: newValue
                })

                validateField(props)
            },
            err: getInputErr(name),
            required: rules[0].required
        }
    }

    const onStoreChange = () => {
        forceUpdate()
    }

    return React.cloneElement(children, getControlled())
}

