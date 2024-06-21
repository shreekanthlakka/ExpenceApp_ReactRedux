import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledAside = styled.aside`
    width: 200px;
    background-color: aliceblue;
    color: black;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 30px 0px;
`;

function LeftPanel() {
    return (
        <StyledAside>
            <Link to="categories">Categories</Link>
            <Link to="expences">Expences</Link>
            <Link>Stats</Link>
        </StyledAside>
    );
}

export default LeftPanel;
