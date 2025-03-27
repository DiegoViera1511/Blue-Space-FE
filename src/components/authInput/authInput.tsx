import {useState} from "react";
import {Eye} from "lucide-react";

interface Input_1Props {
    id: string;
    input_type: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    required: boolean;
    placeholder: string;
}

export function AuthInput({id, input_type, value, onChange, required, placeholder}: Input_1Props) {
    const [type, setType] = useState(input_type)
    return (
        <div
            className="flex flex-row w-full p-1 sm:px-4 bg-gray-100 justify-between rounded-lg items-center "
        >
            <input
                className="outline-none p-1 sm:p-2 w-full bg-transparent text-black"
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={placeholder}
            />
            {input_type === "password" ?
                <Eye
                    className="text-black"
                    onMouseOver={() => setType("text")}
                    onMouseOut={() => setType("password")}
                />
                :
                <></>
            }
        </div>

    )
}