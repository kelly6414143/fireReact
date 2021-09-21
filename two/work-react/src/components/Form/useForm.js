import React, { useRef } from 'react'

class FormStore {
    constructor() {
        this.store = {} //狀態庫
        this.fieldEntities = [] //組件實例
        this.callbacks = {}  //記錄回調
        this.err = []
    }

    //有註冊，得有取消註冊
    //訂閱和取消訂閱也是要成對出現的
    registerFieldEntities = (entity) => {

        this.fieldEntities.push(entity)

        return () => {
            this.fieldEntities = this.fieldEntities.filter(
                (_entity) => _entity !== entity
            )
            delete this.store[entity.props.name]
        }

    }

    //get
    getFieldsValue = () => {
        React.$commonTool.devConsole('getFieldsValue', this.store)
        return { ...this.store }
    }

    getFieldValue = (name) => {
        React.$commonTool.devConsole('getFieldValue', name, this.store[name])
        return this.store[name]
    }

    //set
    setFieldsValue = (newStore) => {
        // 1.修改狀態庫
        this.store = {
            ...this.store,
            ...newStore,
        }

        React.$commonTool.devConsole("store", this.store)

        // 2.更新組件
        // this.fieldEntities.forEach((entity) => {
        //     Object.keys(newStore).forEach((k) => {
        //         React.$commonTool.devConsole("setFieldsValue", k, entity)
        //         if (k === entity.name) {
        //             entity.onStoreChange()
        //         }
        //     })
        // })
    }

    //驗證
    validate = () => {
        let err = []
        //效驗
        const store = this.getFieldsValue()
        const fieldEntities = this.fieldEntities
        fieldEntities.forEach((entity) => {
            let { name, rules } = entity
            let value = this.getFieldValue(name)
            if (rules[0] && (!value || value && value.replace(/\s*/, "") === "")) {
                err.push({ name, err: rules[0].msg })
            }
        })

        if (err.length > 0) {
            this.setInputErr(err)
        }

        return err;
    }

    //get inputerr
    getInputErr = (name) => {
        const errArr = this.err.filter((el) => {
            return el.name === name
        })
        React.$commonTool.devConsole("getInputErr",errArr)
        return errArr.length > 0 && errArr[0].err
    }

    //set inputerr
    setInputErr = (err) => {
        this.err = err
        this.fieldEntities.forEach((entity) => {
            err.forEach((k) => {
                React.$commonTool.devConsole("setInputErr", k, entity)
                if (k.name === entity.name) {
                    // entity.onStoreChange()
                }
            })
        })
    }

    //set回調
    setCallbacks = (newCallbacks) => {
        this.callbacks = {
            ...this.callbacks,
            ...newCallbacks
        }
    }

    submit = () => {
        // 效驗成功 執行onFinish
        // 效驗失敗 執行onFinishFailed
        if (this.validate().length > 0) {
            console.log("submit", this.validate())
            this.callbacks.onFinishFailed()
        } else {
            this.callbacks.onFinish()
        }
    }

    getForm = () => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            validate: this.validate,
            setCallbacks: this.setCallbacks,
            registerFieldEntities: this.registerFieldEntities,
            getInputErr: this.getInputErr,
            submit: this.submit
        }
    }
}

export default function useForm(form) {
    const formRef = useRef()

    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }

    return [formRef.current]
}