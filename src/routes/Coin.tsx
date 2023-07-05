import { useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.h3`
    font-size: 30px;
    text-align: center;
    margin-top: 30px;
    color: ${(props) => props.theme.textColor}
`;


interface RouteParams {
    coinId: string;
}

interface LocationState {
    state: {
        name: string;
    }
}

function Coin() {
    const {coinId} = useParams();
    const [loading, setLoading] = useState(true);
    const {state} = useLocation() as LocationState;

    return (
        <Container>
            <Header>
                <Title>{state?.name || "loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading ...</Loader>
            ) : null}
        </Container>
        );
}

export default Coin;