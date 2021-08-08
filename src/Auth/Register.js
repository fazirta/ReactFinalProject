import React, { useContext, useState } from "react"
import { Form, Input, Button, Layout } from 'antd';
import { UserContext } from "./UserContext"
import axios from "axios"

const { Content } = Layout;

const Register = () => {
    const [, setUser] = useContext(UserContext)
    const [input, setInput] = useState({ name: "", email: "", password: "" })

    const handleSubmit = (event) => {
        axios.post("https://backendexample.sanbersy.com/api/register", {
            name: input.name,
            email: input.email,
            password: input.password
        }).then(
            (res) => {
                var user = res.data.user
                var token = res.data.token
                var currentUser = { name: user.name, email: user.email, token }
                setUser(currentUser)
                localStorage.setItem("user", JSON.stringify(currentUser))
                window.location.reload(false);
            }
        ).catch((err) => {
            alert(err)
        })
    }

    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch (name) {
            case "name": {
                setInput({ ...input, name: value })
                break;
            }
            case "email": {
                setInput({ ...input, email: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
            default: { break; }
        }
    }

    return (
        <>
            <Content style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#fff',
                minHeight: '780px'
            }}>
                {/* Form */}
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }} 
                    style={{ margin: '100px auto', width: '30rem' }} 
                    onFinish={handleSubmit}>
                    <h1 style={{ fontWeight: 'bold', paddingLeft: '100px' }}>Register</h1>
                    <Form.Item
                        label="Name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        value={input.name}
                        onChange={handleChange}
                    >
                        <Input name="name" value={input.name} onChange={handleChange}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        value={input.email}
                        onChange={handleChange}
                    >
                        <Input name="email" value={input.email} onChange={handleChange}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        value={input.password}
                        onChange={handleChange}
                    >
                        <Input.Password name="password" value={input.password} onChange={handleChange}></Input.Password>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5, span: 15 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </>
    )
}

export default Register