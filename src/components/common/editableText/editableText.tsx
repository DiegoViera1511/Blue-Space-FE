import {useState} from "react";

interface EditableTextProps {
    onBlur: () => void;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>
    text: string;
}

export function EditableText({onBlur, value, onChange, text}: EditableTextProps) {
    const [editTitle, setEditTitle] = useState(false);
    return (
        <>
            {editTitle ? (
                <input
                    type="text"
                    placeholder={"Card title"}
                    className={"text-xl font-bold px-1 outline-gray-100"}
                    onBlur={onBlur}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <p
                    className={"text-xl font-bold"}
                    onClick={() => setEditTitle(true)}
                >
                    {text}
                </p>
            )}
        </>

    )
}