interface EditableTextAreaProps {
    value: string;
    setNewText: React.Dispatch<React.SetStateAction<string>>;
    text: string
    editText: boolean
    setEditText: React.Dispatch<React.SetStateAction<boolean>>;
    cn?: string
}

export function EditableTextArea({value, setNewText, text, editText,setEditText,cn}: EditableTextAreaProps) {
    return (
        <>
            {editText ? (
                <>
                    <textarea
                        placeholder={"Card text"}
                        className={`w-full h-fit min-h-[200px] max-h-[500px] overflow-y-auto p-3 ${cn}`}
                        value={value}
                        onBlur={() => setEditText(false)}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                </>
            ) : (
                <div
                    className={`w-full h-fit min-h-[200px] max-h-[500px] overflow-y-auto p-3 ${cn}`}
                    onClick={() => setEditText(true)}
                >
                    <p className={"whitespace-pre-wrap"}>{text}</p>
                </div>
            )}
        </>
    )
}