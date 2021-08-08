import React, { useEffect, useContext } from "react"
import { Image, Typography, Card, Comment, Tooltip, Avatar, Rate, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { MovieContext } from "./MovieContext"
import {
    useParams
} from "react-router-dom";
import axios from "axios"

const { Title, Text } = Typography;

const MovieDetail = () => {
    const [movie, setMovie] = useContext(MovieContext)
    let { slug } = useParams();

    const timeConvert = (n) => {
        var num = n
        var hours = (num / 60)
        var rhours = Math.floor(hours)
        var minutes = (hours - rhours) * 60
        var rminutes = Math.round(minutes)
        var string = ""
        if (rhours == 1) {
            string += rhours + " hour "
        } else {
            string += rhours + " hours "
        }
        if (rminutes > 0) {
            string += rminutes + " minutes."
        }
        return string
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

            setMovie(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, title: x.title, description: x.description, year: x.year, duration: x.duration, genre: x.genre, rating: x.rating, review: x.review, image_url: x.image_url } }))
        }

        fetchData()
    }, [])

    return (
        <>
            {movie.map(el => {
                if (el.id == slug) {
                    return (
                        <>
                            <Card>
                                <Image
                                    width={200}
                                    src={el.image_url}
                                />
                                <Title level={2} style={{ margin: '1rem 0', fontWeight: 'bold' }}>{el.title}</Title>
                                <Title level={5} style={{ fontWeight: 'bold' }}>({el.year})</Title>
                                {el.genre.split(',').map(x => {
                                    return <Tag color="blue" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{x}</Tag>
                                })}
                                <br />
                                <Rate allowHalf disabled defaultValue={el.rating / 2} style={{ marginBottom: '1rem' }} />
                                <Title level={5} style={{ fontWeight: 'bold', display: 'inline', marginLeft: '10px' }}>({el.rating})</Title>
                                <div style={{ margin: '1rem 0', width: '60rem' }}><Text>{el.description}</Text></div>
                                <Title level={5} style={{ fontWeight: 'normal', width: '60rem' }}><ClockCircleOutlined style={{ marginRight: '5px' }} /> {timeConvert(el.duration)}</Title>
                                <Title level={3} style={{ marginTop: '3rem' }}>Reviews</Title>
                                <Comment
                                    style={{ maxWidth: '60rem' }}
                                    author={<a>Anon</a>}
                                    avatar={
                                        <Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            alt="Han Solo"
                                        />
                                    }
                                    content={
                                        <p>
                                            {el.review}
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip title={"1w ago"}>
                                            <span>1w ago</span>
                                        </Tooltip>
                                    }
                                />
                            </Card>
                        </>
                    )
                }
            })}
        </>
    )

}

export default MovieDetail