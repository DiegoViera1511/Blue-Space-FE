import { ArrowRight, Rocket,UserPen,User ,Lock, Check} from 'lucide-react';
import { useState } from 'react';
import { Input_1 } from '../components/Input_1/input_1';
import { UserType } from '../types';

export function LandingPage(){
    const [onCreateAccount, setOnCreateAccount] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }
        const newUser : UserType = {username: username, password: password}
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

    return (
        <>
            <header
                className="
                    fixed top-[1%] left-[1%] z-10 flex flex-row
                    rounded-md  backdrop-blur-sm bg-white/30 
                    w-[98%] h-16 box-border shadow-lg items-center justify-between gap-6 px-6"
            >
                <div className='flex flex-row gap-4 items-center justify-center text-xl sm:text-2xl'>
                    <Rocket/>
                    Blue Space
                </div>
                
                <button className='flex flex-row items-center justify-center gap-4 text-xl sm:text-2xl'>
                    Log in <ArrowRight/>
                </button>
            </header>
            <main
                className="gap-4 w-screen h-screen items-center justify-center bg-gradient-to-b from-cyan-500 to-blue-500"
            >
                <section className='flex flex-col w-screen h-screen gap-4 items-center justify-center'>
                    <div
                        className="flex flex-col gap-4 items-center justify-center"
                    >
                        <p className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl">Welcome to Blue Space !</p>
                        <p className="text-white text-md sm:text-2xl md:text-3xl lg:text-4xl">Organize your tasks, boost your productivity 🚀</p>
                    </div> 
                    {! onCreateAccount && (
                        <button
                        className='flex flex-row gap-4 text-white border-2 rounded-lg mt-10 p-3 transition-all'
                        onClick={() => setOnCreateAccount(true)}
                        >
                            <p>Create new Account</p>
                            <UserPen/>
                        </button>
                    )}
                
                    {onCreateAccount && (
                        <div className='flex flex-col gap-4 text-white border-2 rounded-lg mt-10 p-3 items-center justify-center'>
                            <p>Create new Account</p>
                            <div className='flex flex-col gap-4 items-start justify-center'>
                                <div className='flex flex-row gap-2 items-center justify-center'>
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
                                <div className='flex flex-row gap-2 items-center justify-center'>
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
                                <div className='flex flex-row gap-2 items-center justify-center'>
                                    <label form="register_confirm"><Check/></label>
                                    <Input_1
                                        id="register_confirm"
                                        input_type="password"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        required={true}
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row gap-4 items-center justify-center'>
                                <button onClick={() => { 
                                    setOnCreateAccount(false) 
                                    setConfirmPassword('')
                                    setUsername('')
                                    setPassword('')
                                }}>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    onClick={() => {
                                        handleRegister()
                                        setOnCreateAccount(false)
                                    }}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
        
    )
}