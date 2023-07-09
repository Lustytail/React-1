import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
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


function Chart({coinId}: ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    const exceptData = data ?? [];
    const chartData = exceptData?.map((i) => {
        return {
            x: new Date(i.time_close*1000).toISOString(),
            y: [i.open, i.high, i.low, i.close]
        }
    })
    const isDark = useRecoilValue(isDarkAtom);

    return <div>{isLoading ? "Loading chart..." : 
                 <ApexChart type="candlestick"
                    series={[
                        {
                            data: chartData
                        }
                    ]}
                    options={{
                        //colors: ["black", "white"],
                        theme: { mode: isDark ? "dark" : "light"},
                        chart: {
                            type: "candlestick",
                            height: 500,
                            width: 500,
                            background: "transparent",
                            toolbar: { show: false }
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#e84393",
                                    downward: "#74b9ff"
                                }
                            }
                        },
                        yaxis: { tooltip: { enabled: true}, show: false },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: "datetime",
                        },
                        grid: { show: false },
                }}/>}
            </div>;

/*
    return <div>{isLoading ? "Loading chart..." : 
                 <ApexChart type="line"
                    series={[
                        {
                            name: "price",
                            data: data?.map((price) => parseFloat(price.close)) ?? []
                        }
                    ]} 
                    options={{
                        theme: { mode: "dark" },
                        chart: {
                            height: 500,
                            width: 500,
                            background: "transparent",
                            toolbar: { show: false }
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4
                        },
                        grid: { show: false },
                        yaxis: { show: false },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: "datetime",
                            categories: data?.map((price) => new Date(price.time_close*1000).toISOString()) ?? []
                        },
                        fill : {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#6c5ce7"],
                                stops: [0,100]
                            }
                        },
                        colors: ["#81ecec"],
                        tooltip: {
                            y: { formatter: (value) => `$ ${value.toFixed(2)}` }
                        }
                }}/>}
            </div>;
            */
}

export default Chart;