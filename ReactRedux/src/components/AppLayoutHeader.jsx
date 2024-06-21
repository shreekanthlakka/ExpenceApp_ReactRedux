import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../actions/userActions";
import toast from "react-hot-toast";

// const pages = ["Categories", "Expences", "Stats"];
// const settings = ["Profile", "Dashboard", "Logout"];

const pages = [
    { path: "/categories", name: "Categories" },
    { path: "/expences", name: "Expences" },
    { path: "/stats", name: "Stats" },
];

const settings = [
    { path: "/profile", name: "Profile" },
    { path: "/dashboard", name: "Dashboard" },
    // { path: "/logout", name: "Logout" },
];

function AppLayoutHeader() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        // console.log("Page clicked =>", page);
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        // console.log("SETTING => ", setting);
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(
            startLogout(() => {
                toast.success("Logged out successfully");
                navigate("/login");
            })
        );
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        ExpenceApp
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    // onClick={() => handleCloseNavMenu(page)}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            to={page.path}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {page.name}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        ExpenceApp
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                // onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to={page.path}
                                    style={{ textDecoration: "none" }}
                                >
                                    {page.name}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    // onClick={() => handleCloseUserMenu(setting)}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            to={setting.path}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {setting.name}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            <Button
                                sx={{ marginLeft: "10px" }}
                                onClick={handleLogout}
                                disabled={isLoading}
                            >
                                Logout
                            </Button>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppLayoutHeader;
