import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
    background-color: aliceblue;
    color: black;
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

function Header() {
    return (
        <StyledHeader>
            <Link to="/dashboard">
                <h3>ExpenceApp</h3>
            </Link>
            Profile
        </StyledHeader>
    );
}

export default Header;
