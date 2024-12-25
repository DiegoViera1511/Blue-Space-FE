import {MainPage} from "./pages/mainPage.tsx";
import {UserProvider} from "./context/userContext.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/main' element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
