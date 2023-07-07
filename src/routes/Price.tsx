import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { styled } from "styled-components";

interface PriceProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

const PriceDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PriceSpan = styled.span`
    margin: 5px 40px;
`;

function Price({coinId}: PriceProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["price", coinId], () => fetchCoinHistory(coinId));
    
    return (
        <div>
            <PriceDiv>
                <PriceSpan>Date</PriceSpan>
                <PriceSpan>Price</PriceSpan>
            </PriceDiv>
            {data?.map((price) => {
                const date = new Date(price.time_close*1000);
                return (
                    <PriceDiv>
                       <PriceSpan>{`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`}</PriceSpan>
                       <PriceSpan>${parseFloat(price.close).toFixed(2)}</PriceSpan>
                    </PriceDiv>
                );
            })}

        </div>
    );
}

export default Price;