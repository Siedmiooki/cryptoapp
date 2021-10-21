import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { Cryptocurrencies } from "../components";
import { News } from "../components"

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery();
    const globalStats = data?.data?.stats;

    if (isFetching) return "Loading data...";

    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value={globalStats.exchanges} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="homeHeadingContainer">
                <Title level={2} className="homeTitle">Top 10 Cryptocurrencies in the world</Title>
                <Title level={5} className="showMore"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="homeHeadingContainer">
                <Title level={2} className="homeTitle">Latest Crypto News</Title>
                <Title level={5} className="showMore"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <News simplified />
        </>
    );
}

export default Homepage;