import { ArrowRight, Rocket,UserPen } from 'lucide-react';

export function LandingPage(){
    return (
        <>
            <header
                className="
                    fixed top-[1%] left-[1%] z-10 flex flex-row
                    rounded-md  backdrop-blur-sm bg-white/30 
                    w-[98%] h-16 box-border shadow-lg items-center justify-between gap-6 px-6"
            >
                <div className='flex flex-row gap-4 items-center justify-center text-2xl'>
                    <Rocket/>
                    Blue Space
                </div>
                
                <button className='flex flex-row items-center justify-center gap-4 text-2xl'>
                    Log in <ArrowRight/>
                </button>
            </header>
            <main
                className="gap-4 w-screen h-screen items-center justify-center bg-gradient-to-b from-cyan-500 to-blue-500"
            >
                <section className='flex flex-col w-screen h-screen gap-4 items-center justify-center'>
                    <div
                        className="flex flex-col gap-4"
                    >
                        <p className="flex items-center justify-center text-white text-8xl">Welcome to Blue Space !</p>
                        <p className="flex items-center justify-center text-white text-4xl">Organize your tasks, boost your productivity 🚀</p>
                    </div> 
                    <button className='flex flex-row gap-4 text-white border-2 rounded-lg mt-10 p-3'>
                        Create new Account <UserPen/>
                    </button>
                </section>
            </main>
        </>
        
    )
}