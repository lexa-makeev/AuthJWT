import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Auth from "./Pages/Auth/Auth";
import Footer from "./Components/Footer/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import api, { apiSetHeader } from "./services/api";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        check_token();
    }, []);
    async function check_token() {
        if (localStorage.getItem("access_token") !== null) {
            apiSetHeader(
                "Authorization",
                `Bearer ${localStorage.getItem("access_token")}`
            );
            await api.get("check");
        } else {
            navigate("/login");
        }
    }
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Auth />}></Route>
                <Route path="/" element={<Home />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
