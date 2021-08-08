import React from "react"
import { Layout, Typography } from 'antd';
import { MovieProvider } from "../Movie/MovieContext"
import MovieList from "../Movie/MovieList"

const { Content } = Layout;
const { Title } = Typography;

const Movies = () => {
    return (
        <>
            <Content style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#fff'
            }}>
                <Title level={2} style={{ margin: '1rem' }}>Movies</Title>
                <MovieProvider>
                    <MovieList />
                </MovieProvider>
            </Content>
        </>
    )
}

export default Movies