import React, { useContext, useState } from "react"
import { Form, Input, Button, Layout } from 'antd';
import { UserContext } from "./UserContext"
import axios from "axios"

const { Content } = Layout;

const ChangePassword = () => {
    const [user] = useContext(UserContext)
    const [input, setInput] = useState({ current_password: "", new_password: "", new_confirm_password: "" })

    const handleSubmit = (event) => {
        axios.post("https://backendexample.sanbersy.com/api/change-password", {
            current_password: input.current_password,
            new_password: input.new_password,
            new_confirm_password: input.new_confirm_password
        }, {
            headers: { "Authorization": "Bearer " + user.token }
        }).then(
            (res) => {
                alert("Success!")
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
            case "current_password": {
                setInput({ ...input, current_password: value })
                break;
            }
            case "new_password": {
                setInput({ ...input, new_password: value })
                break;
            }
            case "new_confirm_password": {
                setInput({ ...input, new_confirm_password: value })
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
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 20 }}
                    style={{ margin: '100px auto', width: '30rem' }}
                    onFinish={handleSubmit}>
                    <h1 style={{ fontWeight: 'bold', paddingLeft: '200px' }}>Change Password</h1>
                    <Form.Item
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        value={input.current_password}
                        onChange={handleChange}
                    >
                        <Input.Password name="current_password" value={input.current_password} onChange={handleChange}></Input.Password>
                    </Form.Item>
                    <Form.Item
                        label="New password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        value={input.new_password}
                        onChange={handleChange}
                    >
                        <Input.Password name="new_password" value={input.new_password} onChange={handleChange}></Input.Password>
                    </Form.Item>
                    <Form.Item
                        label="Confirm new password"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        value={input.new_confirm_password}
                        onChange={handleChange}
                    >
                        <Input.Password name="new_confirm_password" value={input.new_confirm_password} onChange={handleChange}></Input.Password>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
                        <Button type="primary" htmlType="submit">
                            Change
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </>
    )
}

export default ChangePassword