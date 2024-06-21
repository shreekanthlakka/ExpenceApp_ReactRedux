import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import Categories from "./components/Categories";
import Expences from "./components/Expences";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<DashBoard />}>
                    <Route index element={<Categories />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="expences" element={<Expences />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
