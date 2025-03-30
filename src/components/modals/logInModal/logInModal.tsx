import {User, Lock, Check} from "lucide-react";
import {AuthInput} from "../../authInput/authInput.tsx";
import {useContext, useEffect, useState} from "react";
import {UserType} from "../../../types.ts";
import {UserContext} from "../../../context/userContext.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {httpRequest} from "../../../api";
import {localStorageToken} from "../../../utils.ts";

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
        const userData: UserType = {username: username, password: password }
        try {
            const response = await httpRequest<string>({
                url: '/user/checklogin',
                method: 'POST',
                data: userData
            })
            if (response.status === 200) {
                const token = response.data
                if (token) {
                    localStorage.setItem(localStorageToken, token)
                }
                setUser(username)
                setIsAuth(true)
            } else if (response.status === 404 || response.status === 400) {
                console.error('Invalid User name or password')
            } else {
                const message = response.message;
                console.error(message)
            }
        } catch (error) {
            console.error('Error creating user: ', error)
        }
    }

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const newUser: UserType = {username: username, password: password}
        await httpRequest({
            url: '/user',
            method: 'POST',
            data: newUser
        })
            .then(() => {
                console.log('User created')
            })
            .catch(error => console.log(error))
    }

    const ContainerInputClassName = "flex flex-row w-full px-3 items-center justify-center bg-gray-100 rounded-md"

    useEffect(() => {
        setPassword("");
        setUsername("");
        setConfirmPassword("");
    }, [signIn,open]);
    
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col gap-5 items-center justify-center ">
                <p className="text-2xl font-medium text-sky-800">Welcome !</p>
                {signIn ?
                    <form className="flex flex-col w-auto p-3 gap-4 items-center justify-center"
                          onSubmit={handleLogIn}>
                        <p className={"font-medium"}>Go to your Workspace</p>
                        <div className={ContainerInputClassName}>
                            <label form="register_username"><User/></label>
                            <AuthInput
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
                            <AuthInput
                                id="register_password"
                                input_type="password"
                                value={password}
                                onChange={setPassword}
                                required={true}
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex flex-row gap-4 w-full items-center justify-center">
                            <SimpleButton
                                onClick={() => undefined}
                                text={"Sign in"}
                                type={"submit"}
                                cn={"hover:bg-sky-500 hover:text-white w-full"}
                            />
                        </div>
                        <div className='relative w-full'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-300'></div>
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-sky-800'>New to Blue Space ?</span>
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            <button 
                                className={"text-gray-500 hover:text-sky-800"}
                                onClick={() => setSignIn(false)}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    :
                    <form className="flex flex-col w-auto gap-4 p-3 items-center justify-center"
                          onSubmit={handleRegister}>
                        <p className={"font-medium"}>Create New Account</p>
                        <div className={ContainerInputClassName}>
                            <label form="register_username"><User/></label>
                            <AuthInput
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
                            <AuthInput
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
                            <AuthInput
                                id="register_confirm"
                                input_type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                required={true}
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="flex flex-row gap-4 w-full items-center justify-center">
                            <SimpleButton
                                onClick={() => undefined}
                                text={"Register"}
                                type={"submit"}
                                cn={"hover:bg-sky-500 hover:text-white w-full"}
                            />
                        </div>
                        <div className='relative w-full'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-300'></div>
                            </div>
                            <div className='relative flex justify-center text-sm'>
                                <span className='px-2 bg-white text-sky-800'>Already have an account ?</span>
                            </div>
                        </div>
                        <div className='flex justify-center text-sm'>
                            <button
                                className={"text-gray-500 hover:text-sky-800"}
                                onClick={() => setSignIn(true)}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                }
            </div>
        </Modal>
    )
}