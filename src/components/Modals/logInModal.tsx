import { User , Lock} from "lucide-react";
import { Input_1 } from "../Input_1/input_1";
import { useContext, useState } from "react";
import { UserType } from "../../types";
import { UserContext } from "../../context/userContext";

interface LogInModalProps {
    setCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function LogInModal({setCloseModal}: LogInModalProps) {
    const {setUser, setIsAuth} = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userData : UserType = {username: username, password: password} 
        try{
            const response = await fetch('http://localhost:8080/api/user/checklogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            if (response.status === 200) {
                const token = await response.json()
                localStorage.setItem('jwt', token)
                setUser(username)
                setIsAuth(true)
            } else if (response.status === 404 || response.status === 400) {
                console.error('Invalid User name or password')
            } else {
                const {message} = await response.json();
                console.error(message)
            }
        } catch (error) {
            console.error('Error creating user: ', error)
        }
    }
    return (
        <div className="flex flex-col gap-5 items-center justify-center ">
            <p className="text-2xl">Welcome Back !</p>
            <form className="flex flex-col w-auto gap-4 border-2 rounded-lg p-3 items-center justify-center" onSubmit={handleLogIn}>
                <p>Go to your Workspace</p>
                <div className='flex flex-row w-full gap-2 items-center justify-center'>
                    <label form="register_username"><User/></label>
                    <Input_1
                        id="register_username"
                        input_type="text"
                        value={username}
                        onChange={setUsername}
                        required={true}
                        placeholder="User name"
                    />
                </div>
                <div className='flex flex-row w-full gap-2 items-center justify-center'>
                    <label form="register_password"><Lock/></label>
                    <Input_1
                        id="register_password"
                        input_type="password"
                        value={password}
                        onChange={setPassword}
                        required={true}
                        placeholder="Password"
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-center">
                    <button type="button" onClick={() => {setCloseModal(false)}}>
                        Cancel
                    </button>
                    <button type="submit">
                        Log in
                    </button>
                </div>
            </form>
        </div>
    )
}