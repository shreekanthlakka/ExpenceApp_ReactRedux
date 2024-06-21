import styled from "styled-components";
import AppLayoutHeader from "./AppLayoutHeader";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startCurrentUser } from "../actions/userActions";
import { startGetAllCategories } from "../actions/categoryActions";
import { startGetAllExpences } from "../actions/expenceActions";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    margin-top: 5rem;
    height: 80vh;
`;

function AppLayout() {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(startCurrentUser());
        dispatch(startGetAllCategories());
        dispatch(startGetAllExpences());
    }, []);
    return (
        <div>
            <AppLayoutHeader />
            <Main>
                <Outlet />
            </Main>
        </div>
    );
}

export default AppLayout;
