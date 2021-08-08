import React from "react"
import { Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import {
    Link,
} from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    let userString = ""
    if (currentUser != null) {
        userString = currentUser.name
    } else {
        userString = ""
    }
    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0 }} >
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ display: 'inline-flex' }}>
                    <Menu.Item><Link to={"/"}>Home</Link></Menu.Item>
                    <Menu.Item><Link to={"/movies"}>Movies</Link></Menu.Item>
                    <Menu.Item><Link to={"/games"}>Games</Link></Menu.Item>
                    {currentUser ? <></> : <Menu.Item><a href="/register">Register</a></Menu.Item>}
                    {currentUser ? <></> : <Menu.Item><a href="/login">Login</a></Menu.Item>}
                </Menu>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ display: 'inline-flex', float: 'right' }}>
                    <Menu.Item icon={<GithubOutlined />}><a href={"https://github.com/fazirta/ReactFinalProject"}>View on Github</a></Menu.Item>
                </Menu>
            </Header>
        </>
    )
}

export default Navbar