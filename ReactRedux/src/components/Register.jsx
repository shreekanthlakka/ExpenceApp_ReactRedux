import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { registerApi } from "../services/userApiServices";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const initialState = {
    name: "",
    email: "",
    password: "",
    phonenumber: "",
};
function Register() {
    const [formData, setFormData] = useState(initialState);
    const [clientErrors, setClientErrors] = useState({});
    const errors = {};
    const navigate = useNavigate();

    function runValidations() {
        if (formData.name.trim().length === 0) {
            errors.name = "name is required.";
        }
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
        if (formData.phonenumber.trim().length === 0) {
            errors.phonenumber = "phonenumber is required.";
        } else if (!validator.isMobilePhone(formData.phonenumber, "any")) {
            errors.phonenumber = "Invalid phone number format";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        runValidations();
        if (Object.keys(errors).length === 0) {
            setClientErrors({});
            const res = await registerApi(formData);
            if (res.status === 201 && res.success) {
                navigate("/login");
                toast.success("user registered sucessfully");
            }
            setFormData(initialState);
            // apicall
        } else {
            setClientErrors(errors);
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <TextField
                label="name"
                variant="outlined"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
            />
            {clientErrors.name && <p>{clientErrors.name}</p>}
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
            <TextField
                label="phonenumber"
                variant="outlined"
                value={formData.phonenumber}
                onChange={(e) =>
                    setFormData({ ...formData, phonenumber: e.target.value })
                }
            />
            {clientErrors.phonenumber && <p>{clientErrors.phonenumber}</p>}
            <Button variant="contained" type="submit">
                Login
            </Button>
        </Container>
    );
}

export default Register;
