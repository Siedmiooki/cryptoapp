import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import Loader from './Loader';
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

    const [cryptos, setCryptos] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchText.toLowerCase()));

        setCryptos(filteredData)

    }, [cryptosList, searchText])


    if (isFetching) return <Loader />

    return (
        <>
            {!simplified && (
                <div className="searchCrypto">
                    <Input placeholder="Search Cryptocurrency" onChange={e => setSearchText(e.target.value)} />
                </div>
            )}

            <Row gutter={[24, 24]} className="cryptoCardContainer">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="cryptoCard" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="cryptoImage" src={currency.iconUrl} alt="crypto logo" />}
                                hoverable
                            >
                                <p>Price: ${millify(currency.price, {
                                    precision: 3,
                                    lowercase: true,
                                    decimalSeparator: ","
                                })}</p>
                                <p>Market Cap: ${millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Cryptocurrencies;