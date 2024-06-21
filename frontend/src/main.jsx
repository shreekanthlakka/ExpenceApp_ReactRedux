import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./contexts/userContext.jsx";
import { CategoryContextProvider } from "./contexts/categoryContexts.jsx";
import { ExpenceContextProvider } from "./contexts/expenceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <ExpenceContextProvider>
                <CategoryContextProvider>
                    <App />
                </CategoryContextProvider>
            </ExpenceContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
