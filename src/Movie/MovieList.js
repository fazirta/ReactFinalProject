import React, { useEffect, useContext } from "react"
import { Image, Typography, Card, Rate, Tag } from 'antd';
import { MovieContext } from "../Movie/MovieContext"
import {
  Link,
} from "react-router-dom";
import axios from "axios"

const { Title } = Typography;

const MovieList = () => {
  const [movie, setMovie] = useContext(MovieContext)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

      setMovie(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, title: x.title, description: x.description, year: x.year, duration: x.duration, genre: x.genre, rating: x.rating, review: x.review, image_url: x.image_url } }))
    }

    fetchData()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
      {movie.map(el => {
        return (
          <>
            <Link to={"/m/" + el.id} style={{ margin: '0 1rem' }}>
              <Card>
                <Image
                  width={200}
                  height={300}
                  style={{ objectFit: 'cover' }}
                  src={el.image_url}
                />

                <Title level={3} style={{ maxWidth: '200px', margin: '0' }}>{el.title}</Title>
                {el.genre.split(',').map(x => {
                  return <Tag color="blue" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{x}</Tag>
                })}
                <br />
                <Rate allowHalf disabled defaultValue={el.rating / 2} />
              </Card>
            </Link>
          </>
        )
      })}
    </div>
  )

}

export default MovieList