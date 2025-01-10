import {MainPage} from "./pages/mainPage.tsx";
import {UserProvider} from "./context/userContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { LandingPage } from "./pages/landingPage.tsx";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/main' element={<MainPage/>}/>
                    <Route path='/' element={<LandingPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
