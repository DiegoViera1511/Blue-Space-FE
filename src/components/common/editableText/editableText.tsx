interface EditableTextProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>
    text: string;
    editText: boolean;
    setEditText: React.Dispatch<React.SetStateAction<boolean>>;
    cn?: string
}

export function EditableText({value, onChange,editText,setEditText, text,cn}: EditableTextProps) {
    return (
        <>
            {editText ? (
                <input
                    type="text"
                    placeholder={"Card title"}
                    className={`px-1 ${cn}`}
                    onBlur={() => setEditText(false)}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <p
                    className={`px-1 ${cn}`}
                    onClick={() => setEditText(true)}
                >
                    {text}
                </p>
            )}
        </>

    )
}