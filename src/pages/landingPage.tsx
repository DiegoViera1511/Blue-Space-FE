import {Rocket} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {Modal} from '../components/common/modal/modal.tsx';
import {LogInModal} from '../components/modals/logInModal/logInModal.tsx';
import {UserContext} from '../context/userContext';
import {Navigate} from 'react-router-dom';
import {LogIn} from 'lucide-react'

export function LandingPage() {
    const {fetchToken, isAuth} = useContext(UserContext)
    const [openSignIn, setOpenSignIn] = useState(false)

    useEffect(() => {
        fetchToken()
    }, [fetchToken, isAuth])

    if (isAuth) {
        return <Navigate to={"/main"}/>
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

                <button onClick={() => setOpenSignIn(true)}
                        className='flex flex-row items-center justify-center gap-4 text-xl sm:text-2xl'>
                    Sign in <LogIn/>
                </button>
            </header>
            <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                <LogInModal setCloseModal={setOpenSignIn}/>
            </Modal>
            <main
                className="gap-4 w-screen h-screen items-center justify-center bg-gradient-to-b from-cyan-500 to-blue-500"
            >
                <section className='flex flex-col w-screen h-screen gap-4 items-center justify-center'>
                    <div
                        className="flex flex-col gap-4 items-center justify-center"
                    >
                        <p className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl">Welcome to Blue Space
                            !</p>
                        <p className="text-white text-md sm:text-2xl md:text-3xl lg:text-4xl">Organize your tasks, boost
                            your productivity 🚀</p>
                    </div>
                </section>
            </main>
        </>

    )
}