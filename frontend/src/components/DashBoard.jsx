import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import LeftPanel from "./LeftPanel";
import RightAside from "./RightAside";
import Footer from "./Footer";

const Cointainer = styled.div`
    display: flex;
    flex: 1;
`;

const Main = styled.main`
    flex: 1;
    padding: 10px;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

function DashBoard() {
    return (
        <StyledDiv>
            <Header />
            <Cointainer>
                <LeftPanel />
                <Main>
                    <Outlet />
                </Main>
                <RightAside />
            </Cointainer>
            <Footer />
        </StyledDiv>
    );
}

export default DashBoard;
