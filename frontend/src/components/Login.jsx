import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

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

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, setUser] = useState({});
    const { login, isLoggedIn } = useUser();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        login(email, password);
        // fetch("http://localhost:5000/api/v1/users/login", {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body: JSON.stringify({ email, password }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => setUser(data.data));
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);

    return (
        <Container>
            <h2>Login in form</h2>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    );
}

export default Login;
