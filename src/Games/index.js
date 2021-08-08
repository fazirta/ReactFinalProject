import React from "react"
import { Layout, Typography } from 'antd';
import { GameProvider } from "../Game/GameContext"
import GameList from "../Game/GameList";

const { Content } = Layout;
const { Title } = Typography;

const Games = () => {
    return (
        <>
            <Content style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#fff'
            }}>
                <Title level={2} style={{ margin: '1rem' }}>Games</Title>
                <GameProvider>
                    <GameList />
                </GameProvider>
            </Content>
        </>
    )
}

export default Games