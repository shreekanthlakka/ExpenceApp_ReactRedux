import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { useDispatch } from "react-redux";
import { startLogin } from "../actions/userActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const initialState = {
    email: "",
    password: "",
};
function Login() {
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const navigate = useNavigate();
    const errors = {};
    const dispatch = useDispatch();

    function runValidations() {
        if (formData.email.trim().length === 0) {
            errors.email = "Email is required.";
        } else if (!validator.isEmail(formData.email)) {
            errors.email = "invalid email format";
        }
        if (formData.password.trim().length === 0) {
            errors.password = "Password field cannot be empty";
        } else if (
            formData.password.trim().length < 6 ||
            formData.password.trim().length > 20
        ) {
            errors.password = `password should be in between 5 and 20 characters.`;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(errors).length === 0) {
            setClientErrors({});
            await dispatch(
                startLogin(formData, () => {
                    toast.success("Login sucessfull");
                    navigate("/categories");
                })
            );
            // apicall
        } else {
            setClientErrors(errors);
        }
    }
    return (
        <Container onSubmit={handleSubmit}>
            <TextField
                label="email"
                variant="outlined"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
            />
            {clientErrors.email && <p>{clientErrors.email}</p>}
            <TextField
                label="password"
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
            />
            {clientErrors.password && <p>{clientErrors.password}</p>}
            <Button variant="contained" type="submit">
                Login
            </Button>
        </Container>
    );
}

export default Login;
