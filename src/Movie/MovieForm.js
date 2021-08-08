import React, { useState } from "react"
import { Form, Input, Button, Layout, Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import axios from "axios"
import {
  Redirect
} from "react-router-dom";

const { Content } = Layout;

const MovieForm = () => {
  const [input, setInput] = useState({ title: "", description: "", year: "", duration: "", genre: "", rating: 0, review: "", image_url: "" })
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const handleChange = (event) => {
    let value = event.target.value
    let name = event.target.name
    switch (name) {
      case "title": {
        setInput({ ...input, title: value })
        break;
      }
      case "description": {
        setInput({ ...input, description: value })
        break;
      }
      case "year": {
        setInput({ ...input, year: value })
        break;
      }
      case "duration": {
        setInput({ ...input, duration: value })
        break;
      }
      case "genre": {
        setInput({ ...input, genre: value })
        break;
      }
      case "review": {
        setInput({ ...input, review: value })
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: value })
        break;
      }
      default: { break; }
    }
  }

  const handleRatingChange = (value) => {
    setInput({ ...input, rating: value * 2 })
  }

  const handleSubmit = (event) => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (input.rating >= 0 && input.rating <= 10 && input.year >= 1980 && input.year <= 2021) {

      axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
        title: input.title,
        description: input.description,
        year: input.year,
        duration: input.duration,
        genre: input.genre,
        rating: input.rating,
        review: input.review,
        image_url: input.image_url,
      }, {
        headers: { "Authorization": "Bearer " + user.token }
      })
      alert("Successfully added " + input.title + "!")
      setInput({ title: "", description: "", year: "", duration: "", genre: "", rating: "", review: "", image_url: "" })
      setRedirectToReferrer(true)
    } else {
      alert("Please fill in all fields. The minimum rating is 0, and the maximum is 10. The minimum year is 1980, and the maximum is 2021.")
    }
  }
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
            style={{ margin: '50px auto', width: '40rem' }}
            onFinish={handleSubmit}>
            <h1 style={{ fontWeight: 'bold', paddingLeft: '133px' }}>Add New Movie</h1>
            <Form.Item
              label="Title"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.title}
              onChange={handleChange}
            >
              <Input name="title" value={input.title}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Description"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.description}
              onChange={handleChange}
            >
              <Input.TextArea name="description" value={input.description}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Year"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.year}
              onChange={handleChange}
            >
              <Input name="year" value={input.year}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Duration"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.duration}
              onChange={handleChange}
            >
              <Input name="duration" value={input.duration}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Genre"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.genre}
              onChange={handleChange}
            >
              <Input name="genre" value={input.genre}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Rating"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.rating}
              onChange={handleRatingChange}
            >
              <Rate
                name="rating"
                value={input.rating / 2}
                onChange={handleRatingChange}
                defaultValue={0}
                character={({ index }) => customIcons[index + 1]} />
            </Form.Item>
            <Form.Item
              label="Review"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.review}
              onChange={handleChange}
            >
              <Input.TextArea name="review" value={input.review}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Image URL"
              rules={[{ required: true, message: 'Please input your username!' }]}
              value={input.image_url}
              onChange={handleChange}
            >
              <Input name="image_url" value={input.image_url}
                onChange={handleChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </>
    )
  } else {
    return <Redirect to="/movies/list" />
  }
}

export default MovieForm