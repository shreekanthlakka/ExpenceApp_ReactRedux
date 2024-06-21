import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Div = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    width: 100px;
    height: 50px;
`;

function Home() {
    return (
        <Container>
            <h2>Welcome to Expence App. Track all your expences here</h2>
            <Div>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>

                <Link to="/signup">
                    <Button>SignUp</Button>
                </Link>
            </Div>
        </Container>
    );
}

export default Home;
