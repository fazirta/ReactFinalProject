import React from "react"
import { Layout, Divider, Typography } from 'antd';
import { MovieProvider } from "../Movie/MovieContext"
import MovieListHome from "../Movie/MovieListHome"
import { GameProvider } from "../Game/GameContext";
import GameListHome from "../Game/GameListHome";

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    let userString = ""
    if (currentUser != null) {
        userString = currentUser.name
    } else {
        userString = ""
    }
    return (
        <>
            <Layout>
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: '#fff'
                        }}>
                            {currentUser ? <Title level={2} style={{ fontWeight: 'normal', margin: '1rem' }}>Welcome home, {userString}!</Title> : null}
                            <Divider />
                            <Title level={2} style={{ margin: '1rem' }}>Latest Movies</Title>
                            <MovieProvider>
                                <MovieListHome />
                            </MovieProvider>
                            <Title level={2} style={{ margin: '1rem' }}>Latest Games</Title>
                            <GameProvider>
                                <GameListHome />
                            </GameProvider>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

export default Home