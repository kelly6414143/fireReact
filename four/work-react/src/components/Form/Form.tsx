import { ReactNode } from "react";
import FieldContext from "@/components/Form/FieldContext";
import useForm from "./useForm";

interface IData {
    username: string;
    password: string;
    name?: string;
  }

interface IForm {
    form?: HTMLInputElement |null;
    children?: ReactNode;
    onFinish?: ({}:IData)=>void;
    onFinishFailed?: ()=>void;
    className?: string;
}

export default function Form({
    form,
    children,
    onFinish = () => { },
    onFinishFailed = () => { },
    className
}:IForm) {
    const [formInstance] = new (useForm as any)(form)

    formInstance.setCallbacks({
        onFinish,
        onFinishFailed
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                formInstance.submit()
            }}
            className={`mb-4 mt-6 ${className}`}
        >
            <FieldContext.Provider value={formInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )

}

