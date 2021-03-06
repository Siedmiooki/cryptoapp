import { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons"
import icon from "../img/logo.png"

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="navContainer">
            <div className="logoContainer">
                <Avatar src={icon} size="large" />
                <Typography.Title level={3} className="logo">
                    <Link to="/">Crypto HQ</Link>
                </Typography.Title>
                <Button className="menuControlContainer" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
            <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />} className="menuItem">
                    <Link to="/">Home</Link>
                </Menu.Item>
                    <Menu.Item icon={<FundOutlined />} className="menuItem">
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />} className="menuItem">
                        <Link to="/exchanges">Exchange Markets</Link>
                </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />} className="menuItem">
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
            )}
        </div>
    );
}

export default Navbar;