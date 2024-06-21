import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../services/userApiServices";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 80vh;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
    font-size: large;
    font-weight: 500;
    margin: 10px;
    & input {
        height: 20px;
        border: 2px solid black;
        padding: 5px;
    }
    & label {
    }
`;

const Button = styled.button`
    margin: auto;
    width: 100%;
    height: 40px;
`;

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !password || !phonenumber) return;
        const res = await registerApi({ name, email, password, phonenumber });
        console.log("RES =>", res);
        if (res.success) {
            navigate("/login");
        }
    }

    return (
        <Container>
            <h2>Login in form</h2>
            <form onSubmit={handleSubmit}>
                <InputContainer>
                    <label htmlFor="name">name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="phonenumber">phonenumber</label>
                    <input
                        type="text"
                        id="phonenumber"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </InputContainer>
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    );
}

export default SignUp;
