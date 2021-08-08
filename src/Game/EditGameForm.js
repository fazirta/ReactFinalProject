import React, { useState, useEffect } from "react"
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import axios from "axios"
import {
    Redirect,
    useParams
} from "react-router-dom";

const { Content } = Layout;

const EditGameForm = () => {
    let { slug } = useParams();

    const [input, setInput] = useState({ genre: "", image_url: "", singlePlayer: 0, multiplayer: 0, name: "", platform: "", release: "" })
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)

    const handleChange = (event) => {
        let value = event.target.value
        let checked = event.target.checked
        let name = event.target.name
        switch (name) {
            case "genre": {
                setInput({ ...input, genre: value })
                break;
            }
            case "image_url": {
                setInput({ ...input, image_url: value })
                break;
            }
            case "singlePlayer": {
                setInput({ ...input, singlePlayer: checked == false ? 0 : 1 })
                break;
            }
            case "multiplayer": {
                setInput({ ...input, multiplayer: checked == false ? 0 : 1 })
                break;
            }
            case "name": {
                setInput({ ...input, name: value })
                break;
            }
            case "platform": {
                setInput({ ...input, platform: value })
                break;
            }
            case "release": {
                setInput({ ...input, release: value })
                break;
            }
            default: { break; }
        }
    }

    const handleSubmit = (event) => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (input.singlePlayer >= 0 && input.singlePlayer <= 1 && input.multiplayer >= 0 && input.multiplayer <= 1 && input.release >= 2000 && input.release <= 2021) {

            axios.put(`https://backendexample.sanbersy.com/api/data-game/${slug}`, {
                genre: input.genre,
                image_url: input.image_url,
                singlePlayer: input.singlePlayer,
                multiplayer: input.multiplayer == null ? 0 : input.multiplayer,
                name: input.name,
                platform: input.platform,
                release: input.release,
            }, {
                headers: { "Authorization": "Bearer " + user.token }
            })
            alert("Successfully edited " + input.name + "!")
            setInput({ genre: "", image_url: "", singlePlayer: 0, multiplayer: 0, name: "", platform: "", release: "" })
            setRedirectToReferrer(true)
        } else {
            alert("Please fill in all fields. The minimum release year is 2000 and the maximum is 2021.")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${slug}`)
                .then(res => {
                    let currentGame = res.data
                    setInput({
                        genre: currentGame.genre,
                        image_url: currentGame.image_url,
                        singlePlayer: currentGame.singlePlayer,
                        multiplayer: currentGame.multiplayer,
                        name: currentGame.name,
                        platform: currentGame.platform,
                        release: currentGame.release
                    })
                })
        }
        fetchData()
    }, [])

    if (!redirectToReferrer) {
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
                        wrapperCol={{ span: 20 }}
                        initialValues={{ remember: true }}
                        style={{ margin: '50px auto', width: '40rem' }}
                        onFinish={handleSubmit}>
                        <h1 style={{ fontWeight: 'bold', paddingLeft: '133px' }}>Edit "{input.name}"</h1>
                        <Form.Item
                            label="Name"
                            value={input.name}
                            onChange={handleChange}
                        >
                            <Input name="name" value={input.name}
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            label="Genre"
                            value={input.genre}
                            onChange={handleChange}
                        >
                            <Input name="genre" value={input.genre}
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            placeholder="0 or 1"
                            onChange={handleChange}
                            wrapperCol={{ offset: 5, span: 20 }}>
                            <Checkbox name="singlePlayer" checked={input.singlePlayer == 1 ? true : false}
                                onChange={handleChange}>Singleplayer</Checkbox>
                        </Form.Item>
                        <Form.Item
                            placeholder="0 or 1"
                            onChange={handleChange}
                            wrapperCol={{ offset: 5, span: 20 }}>
                            <Checkbox name="multiplayer" checked={input.multiplayer == 1 ? true : false}
                                onChange={handleChange}>Multiplayer</Checkbox>
                        </Form.Item>
                        <Form.Item
                            label="Platform"
                            value={input.platform}
                            onChange={handleChange}
                        >
                            <Input name="platform" value={input.platform}
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            label="Initial release year"
                            value={input.release}
                            onChange={handleChange}
                        >
                            <Input name="release" value={input.release}
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item
                            label="Image URL"
                            value={input.image_url}
                            onChange={handleChange}
                        >
                            <Input name="image_url" value={input.image_url}
                                onChange={handleChange} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
                            <Button type="primary" htmlType="submit">
                                Edit
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </>
        )
    } else {
        return <Redirect to="/games/list" />
    }
}

export default EditGameForm