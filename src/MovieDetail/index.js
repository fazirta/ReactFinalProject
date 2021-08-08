import React from "react"
import { Layout, Breadcrumb } from 'antd';
import { MovieProvider } from "../Movie/MovieContext"
import MovieDetail from "../Movie/MovieDetail"

const { Content } = Layout;

const DetailMovie = () => {
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
                        <Breadcrumb.Item>Movie Details</Breadcrumb.Item>
                    </Breadcrumb>
                    <MovieProvider>
                        <MovieDetail />
                    </MovieProvider>
                </Content>
            </Layout>
        </>
    )
}

export default DetailMovie