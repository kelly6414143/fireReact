import FieldContext from "@/stores/FieldContext";
import useForm from "./useForm";

export default function Form ({
    form,
    children,
    onFinish,
    onFinishFailed
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
        >
            <FieldContext.Provider value={formInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )

}

