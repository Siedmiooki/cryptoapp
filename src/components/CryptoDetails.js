import { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {

    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });


    const cryptoDetails = data?.data?.coin;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    if (isFetching) return "Loading..."


    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: ` $ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];



    return (
        <Col className="coinDetailContainer">
            <Col className="coinHeadingContainer">
                <Title level={2} className="coinName">
                    {cryptoDetails.name} ({cryptoDetails.slug}) Price
                </Title>
                <p>{cryptoDetails.name} updated price in US dollars.
                    View value statistics, market cap and supply.
                </p>
            </Col>
            <Select defaultValue="7d"
                className="selectTimeperiod"
                placeholder="Select Time Period"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map(date => <Option key={date}>{date}</Option>)}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
            <Col className="statsContainer">
                <Col className="coinValueStatistics">
                    <Col className="coinValueStatisticsHeading">
                        <Title level={3} className="coinDetailsHeading">
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            Stats overview of {cryptoDetails.name}:
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coinStats">
                            <Col className="coinStatsName">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="otherStatsInfo">
                    <Col className="coinValueStatisticsHeading">
                        <Title level={3} className="coinDetailsHeading">
                            {cryptoDetails.name} Other Statistics
                        </Title>
                        <p>
                            All cryptocurrencies stats:
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coinStats">
                            <Col className="coinStatsName">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coinDescLink">
                <Row className="coinDesc">
                    <Title level={3} className="coinDetailsHeading">
                        What is {cryptoDetails.name} ?
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className="coinLinks">
                    <Title level={3} className="coinDetailsHeading">
                        {cryptoDetails.name} Links:
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className="coinLink" key={link.name}>
                            <Title level={5} className="linkName">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
}

export default CryptoDetails;