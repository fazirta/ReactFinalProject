import React, { useEffect, useContext } from "react"
import { Image, Typography, Card, Tag } from 'antd';
import { GameContext } from "../Game/GameContext"
import {
  Link,
} from "react-router-dom";
import axios from "axios"

const { Title } = Typography;

const GameList = () => {
  const [game, setGame] = useContext(GameContext)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)

      setGame(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, name: x.name, genre: x.genre, singlePlayer: x.singlePlayer, multiplayer: x.multiplayer, platform: x.platform, release: x.release, image_url: x.image_url } }))
    }

    fetchData()
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
      {game.map(el => {
        return (
          <>
            <Link to={"/g/" + el.id} style={{ margin: '0 1rem' }}>
              <Card>
                <Image
                  width={200}
                  height={300}
                  style={{ objectFit: 'cover' }}
                  src={el.image_url}
                />

                <Title level={3} style={{ maxWidth: '200px', margin: '0' }}>{el.name}</Title>
                <Title level={5} style={{ fontWeight: 'normal', margin: '.5rem 0' }}>{el.release}</Title>
                {el.genre.split(',').map(x => {
                    return <Tag color="blue" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{x.length > 13 ? x.substring(0, 13) + "..." : x}</Tag>
                  })}
                  <br />
              </Card>
            </Link>
          </>
        )
      })}
    </div>
  )

}

export default GameList