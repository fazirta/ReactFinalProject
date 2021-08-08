import React from "react"
import { Layout, Breadcrumb } from 'antd';
import { GameProvider } from "../Game/GameContext"
import GameDetail from "../Game/GameDetail"

const { Content } = Layout;

const DetailGame = () => {
    return (
        <>
            <Layout className="layout">
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: '#fff'
                }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Game Details</Breadcrumb.Item>
                    </Breadcrumb>
                    <GameProvider>
                        <GameDetail />
                    </GameProvider>
                </Content>
            </Layout>
        </>
    )
}

export default DetailGame