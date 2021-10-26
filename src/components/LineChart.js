import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "rgb(82, 90, 160)",
                borderColor: "rgb(82, 90, 160)"
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className="chartHeader">
                <Title level={3} className="chartTitle">
                    {coinName} Price Chart
                </Title>
                <Col className="priceContainer">
                    <Title level={5} className="priceChange">
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="currentPrice">
                        Current {coinName} Price: ${currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
}

export default LineChart;