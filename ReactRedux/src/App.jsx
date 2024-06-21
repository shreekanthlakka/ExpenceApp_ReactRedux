import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import AppLayout from "./components/AppLayout";
import { Toaster } from "react-hot-toast";
import Categories from "./components/Categories";
import Expences from "./components/Expences";
import Stats from "./components/Stats";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.user);
    console.log("STATE => ", user);
    useState(() => {
        localStorage.setItem("initUserState", JSON.stringify(user));
    }, [user]);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="/categories" />}
                        />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/expences" element={<Expences />} />
                        <Route path="/stats" element={<Stats />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                    },
                    error: {
                        duration: 2500,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "gray",
                    },
                }}
            />
        </div>
    );
}

export default App;
