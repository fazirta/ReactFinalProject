import React from "react"
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterSection = () => {
    return (
        <>

            <Footer style={{ textAlign: 'center' }}>Made with ❤ by <a href="https://github.com/fazirta">Fazil Tirtana</a> with <a href="https://github.com/facebook/react/">React JS</a> and <a href="https://ant.design/">Ant Design UI</a></Footer>
        </>
    )
}

export default FooterSection