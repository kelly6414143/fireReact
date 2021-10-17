import React, { ReactNode, useRef } from "react";

interface IEntity {
  name: string;
  value?: {};
  index?: number;
  array?: {}[];
  onStoreChange:()=>void;
  rules: {[key: string]: any}[]
}

interface IError {
  name: string;
  err?: string;
}

class FormStore {

  store: {[key: string]: any}
  fieldEntities:IEntity[]
  form: {}
  callbacks:{[key: string]: any}
  err:IError[]

  constructor() {
    this.store = {}; //狀態庫
    this.fieldEntities = []; //組件實例
    this.form = {};
    this.callbacks = {}; //記錄回調
    this.err = [];
  }

  //有註冊，得有取消註冊
  //訂閱和取消訂閱也是要成對出現的
  registerFieldEntities = (entity:IEntity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter(
        (_entity) => _entity !== entity
      );
      delete this.store[entity.name];
    };
  };

  //get
  getFieldsValue = () => {
    // React.$commonTool.devConsole('getFieldsValue', this.store)
    return { ...this.store };
  };

  getFieldValue = (name:string) => {
    // React.$commonTool.devConsole('getFieldValue', name, this.store[name])
    return this.store[name];
  };

  //set
  setFieldsValue = (newStore:{}):void =>{
    // 1.修改狀態庫
    this.store = {
      ...this.store,
      ...newStore,
    };

    // React.$commonTool.devConsole("store", this.store)

    // 2.更新組件
    this.fieldEntities.forEach((entity:IEntity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  //驗證
  validate = () => {
    let err:IError[] = [];
    //效驗
    const store = this.getFieldsValue();
    const fieldEntities = this.fieldEntities;
    fieldEntities.forEach((entity:IEntity) => {
      let { name, rules } = entity;
      let value = this.getFieldValue(name);
      if (
        rules &&
        rules[0] &&
        (!value || (value && value.replace(/\s*/, "") === ""))
      ) {
        err.push({ name, err: rules && rules[0].msg });
      } else if (rules && rules[0] && typeof rules[0].validator === "string") {
        // React.$commonTool.devConsole('validate', rules[0].validator)
        let isValid = true;
        switch (rules[0].validator) {
          case "email":
            isValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
            break;
          default:
            break;
        }
        // React.$commonTool.devConsole('validate1', name, isValid)
        if (!isValid) {
          err.push({ name, err: rules[0].msg });
        }
      } else if (rules && rules[0] && rules[0].validator) {
        let isValid = rules[0].validator(value);
        if (!isValid) {
          err.push({ name, err: rules[0].msg });
        }
      }
    });

    // React.$commonTool.devConsole('validate', err, this.err.length)

    if (err.length > 0) {
      this.setInputErr(err);
    } else {
      if (this.err.length > 0) {
        this.setInputErr([]);
      }
    }

    return err;
  };

  //個別驗證
  validateField = (entity:IEntity) => {
    let { name, rules } = entity;
    let value = this.getFieldValue(name);
    // React.$commonTool.devConsole('validate11111', name, rules[0] && typeof rules[0].validator)
    if (
      rules &&
      rules[0] &&
      (!value || (value && value.replace(/\s*/, "") === ""))
    ) {
      this.setInputErr([...this.err, { name, err: rules[0].msg }]);
    } else if (rules && rules[0] && typeof rules[0].validator === "string") {
      let isValid = true;
      switch (rules[0].validator) {
        case "email":
          isValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
          break;
        default:
          break;
      }
      // React.$commonTool.devConsole('validate1', name, isValid)
      if (!isValid) {
        this.setInputErr([...this.err, { name, err: rules[0].msg }]);
      } else {
        this.err = this.err.filter((el) => el.name !== name);
        this.setInputErr(this.err);
      }
    } else if (rules && rules[0] && rules[0].validator) {
      let isValid = rules[0].validator(value);
      if (!isValid) {
        this.setInputErr([...this.err, { name, err: rules[0].msg }]);
      } else {
        this.err = this.err.filter((el) => el.name !== name);
        this.setInputErr(this.err);
      }
    } else {
      this.err = this.err.filter((el) => el.name !== name);
      this.setInputErr(this.err);
    }
  };

  //get inputerr
  getInputErr = (name:string) => {
    const errArr = this.err.filter((el) => {
      return el.name === name;
    });
    return errArr.length > 0 && errArr[0].err;
  };

  //set inputerr
  setInputErr = (err:IError[]) => {
    this.err = err;

    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange();
    });
  };

  //set回調
  setCallbacks = (newCallbacks:{}) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  submit = () => {
    // 效驗成功 執行onFinish
    // 效驗失敗 執行onFinishFailed

    const isValid = this.validate().length === 0;
    if (!isValid) {
      this.callbacks.onFinishFailed();
    } else {
      this.callbacks.onFinish(this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      validate: this.validate,
      validateField: this.validateField,
      setCallbacks: this.setCallbacks,
      registerFieldEntities: this.registerFieldEntities,
      getInputErr: this.getInputErr,
      submit: this.submit,
    };
  };
}

export default function useForm(form?: HTMLInputElement | null) {
  const formRef = useRef<HTMLInputElement | null>();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore:{[index:string]:any}= new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
