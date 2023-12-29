import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ClientView} from "./pages/MainView";
import {AdminView} from "./pages/AdminView";
import {UserView} from "./pages/PlayerView";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<ClientView />} />
                <Route path="user" element={<UserView />} />
                <Route path="admin" element={<AdminView />} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default App
