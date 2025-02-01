import {useState} from "react";

interface EditableTextAreaProps {
    value: string;
    setNewText: React.Dispatch<React.SetStateAction<string>>;
    text: string
    handleSaveEdit: () => void;
}

export function EditableTextArea({value, setNewText, text, handleSaveEdit}: EditableTextAreaProps) {
    const [editText, setEditText] = useState(false)
    return (
        <>
            {editText ? (
                <>
                    <textarea
                        placeholder={"Card text"}
                        className={"bg-gray-100 rounded border-2 w-full h-fit min-h-[200px] max-h-[500px] overflow-y-auto p-3"}
                        value={value}
                        onBlur={handleSaveEdit}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                </>
            ) : (
                <div
                    className={"bg-gray-100 rounded border-2 w-full h-fit min-h-[200px] max-h-[500px] overflow-y-auto p-3"}
                    onClick={() => setEditText(true)}
                >
                    <p className={"whitespace-pre-wrap"}>{text}</p>
                </div>
            )}
        </>
    )
}