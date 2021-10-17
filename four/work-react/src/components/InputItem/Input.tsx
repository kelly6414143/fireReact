interface IProps {
    value? : string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    onChange?: ()=>void;
    labelClassName?: string;
    err?: string;
}

export default function Input({ value, type, label, required, placeholder, onChange, labelClassName, err }:IProps) {

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
                    type={type || 'text'}
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
