import FieldContext from "@/stores/FieldContext";
import useForm from "./useForm";

export default function Form ({
    form,
    children,
    onFinish,
    onFinishFailed,
    className
}){
    const [formInstance] = new useForm(form)

    formInstance.setCallbacks({
        onFinish,
        onFinishFailed
    })

    return (
        <form
            onSubmit={(e)=>{
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

