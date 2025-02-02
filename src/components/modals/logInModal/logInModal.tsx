import {User, Lock, Check} from "lucide-react";
import {Input_1} from "../../input_1/input_1.tsx";
import {useContext, useState} from "react";
import {UserType} from "../../../types.ts";
import {UserContext} from "../../../context/userContext.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {Modal} from "../../common/modal/modal.tsx";

interface LogInModalProps {
    open : boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function LogInModal({open ,setOpen}: LogInModalProps) {
    const {setUser, setIsAuth} = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [signIn, setSignIn] = useState(true)

    const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userData: UserType = {username: username, password: password}
        try {
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

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const newUser: UserType = {username: username, password: password}
        fetch('http://localhost:8080/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch(error => console.log(error))
    }

    const ContainerInputClassName = "flex flex-row w-full gap-2 items-center justify-center"

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col gap-5 items-center justify-center ">
                <p className="text-2xl">Welcome !</p>
                <div className={"flex flex-row items-center justify-around p-1 border-2 rounded gap-1"}>
                    <div className={`p-1 px-3 cursor-pointer ${signIn ? 'rounded bg-gray-200' : ''}`}
                         onClick={() => setSignIn(true)}
                    >
                        <p>Sign in</p>
                    </div>
                    <div className={`p-1 px-3 cursor-pointer ${!signIn ? 'rounded bg-gray-200' : ''}`}
                         onClick={() => setSignIn(false)}
                    >
                        <p>Sign up</p>
                    </div>
                </div>
                {signIn ?
                    <form className="flex flex-col w-auto gap-4 border-2 rounded-lg p-3 items-center justify-center"
                          onSubmit={handleLogIn}>
                        <p>Go to your Workspace</p>
                        <div className={ContainerInputClassName}>
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
                        <div className={ContainerInputClassName}>
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
                            <SimpleButton
                                onClick={() => setOpen(false)}
                                text={"Cancel"}
                            />
                            <SimpleButton
                                onClick={() => undefined}
                                text={"Log in"}
                                type={"submit"}
                            />
                        </div>
                    </form>
                    :
                    <form className="flex flex-col w-auto gap-4 border-2 rounded-lg p-3 items-center justify-center"
                          onSubmit={handleRegister}>
                        <p>Create New Account</p>
                        <div className={ContainerInputClassName}>
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
                        <div className={ContainerInputClassName}>
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
                        <div className={ContainerInputClassName}>
                            <label form="register_password"><Check/></label>
                            <Input_1
                                id="register_confirm"
                                input_type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                required={true}
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <SimpleButton
                                onClick={() => setOpen(false)}
                                text={"Cancel"}
                            />
                            <SimpleButton
                                onClick={() => undefined}
                                text={"Register"}
                                type={"submit"}
                            />
                        </div>
                    </form>
                }
            </div>
        </Modal>
    )
}