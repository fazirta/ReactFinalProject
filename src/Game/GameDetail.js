import React, { useEffect, useContext } from "react"
import { Image, Typography, Card, Tag } from 'antd';
import { GameContext } from "./GameContext"
import {
    useParams
} from "react-router-dom";
import axios from "axios"

const { Title } = Typography;

const GameDetail = () => {
    const [game, setGame] = useContext(GameContext)
    let { slug } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)

            setGame(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, name: x.name, genre: x.genre, singlePlayer: x.singlePlayer, multiplayer: x.multiplayer, platform: x.platform, release: x.release, image_url: x.image_url } }))
        }

        fetchData()
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {game.map(el => {
                if (el.id == slug) {
                    return (
                        <>
                            <Card style={{ width: '100%' }}>
                                <Image
                                    width={200}
                                    height={300}
                                    style={{ objectFit: 'cover' }}
                                    src={el.image_url}
                                />
                                <Title level={2} style={{ margin: '1rem 0', fontWeight: 'bold' }}>{el.name}</Title>
                                <Title level={5} style={{ fontWeight: 'bold' }}>({el.release})</Title>
                                {el.genre.split(',').map(x => {
                                    return <Tag color="blue" style={{ marginTop: '1rem', marginBottom: '2rem' }}>{x}</Tag>
                                })}
                                <br />
                                {el.multiplayer == 1 ? <Title level={5} style={{ fontWeight: 'normal' }}><b>Multiplayer</b> : Yes</Title> : <Title level={5} style={{ fontWeight: 'normal', margin: '0' }}><b>Multiplayer</b> : No</Title>}
                                {el.singlePlayer == 1 ? <Title level={5} style={{ fontWeight: 'normal' }}><b>Singleplayer</b> : Yes</Title> : <Title level={5} style={{ fontWeight: 'normal', margin: '0' }}><b>Singleplayer</b> : No</Title>}
                                <Title level={5} style={{ fontWeight: 'bold', display: 'inline' }}>Platforms : </Title>
                                {el.platform.split(',').map(x => {
                                    return <Tag color="magenta" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{x}</Tag>
                                })}
                            </Card>
                        </>
                    )
                }
            })}
        </div>
    )

}

export default GameDetail