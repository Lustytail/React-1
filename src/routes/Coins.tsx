import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";


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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${props => props.theme.blkColor};
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;

    a{
        transition: color 0.2s ease-in;
        display: flex;
        padding: 20px;
        align-items: center;
        width: -webkit-fill-available;
    }

    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
            font-size: large;
        }
    }
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

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}


function Coins() {
    /*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
        // fetch("https://api.coinpaprika.com/v1/tickers?limit=5")
        // .then((response) => response.json())
        // .then((json) => {
        //   setCoins(json);
        // });
      }, []);
*/
    const {isLoading, data} = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading ...</Loader>
            ) : (
            <CoinsList>
                {data?.map((coin) => <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={{name: coin.name}}>
                        <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}></Img>{coin.name} &rarr;
                    </Link>
                    </Coin>)}
            </CoinsList>
            )}
        </Container>
    );
}

export default Coins;