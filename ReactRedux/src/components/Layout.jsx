import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
`;

function Layout() {
    const { userAccount, isLoading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (userAccount && !isLoading) {
            navigate("/categories");
        }
    }, [userAccount, isLoading, navigate]);
    return (
        <div>
            <Header />
            <Main>
                <Outlet />
            </Main>
        </div>
    );
}

export default Layout;
