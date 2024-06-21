import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
    & a {
        text-decoration: none;
    }
`;

function Header() {
    const location = useLocation();
    const url = location.pathname;
    return (
        <StyledHeader>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#ab9fbb" }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: "600" }}
                        >
                            ExpenceApp
                        </Typography>
                        {url === "/login" ? (
                            <Link to="/register">
                                <Button color="inherit">Register</Button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <Button color="inherit">Login</Button>
                            </Link>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </StyledHeader>
    );
}

export default Header;
