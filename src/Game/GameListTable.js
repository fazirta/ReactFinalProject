import React from "react"
import { Layout, Table, Input, Button, Space, Popconfirm, Breadcrumb } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GameContext } from "./GameContext"
import axios from "axios"
import {
    Link,
} from "react-router-dom";

const { Content } = Layout;

class GameListTable extends React.Component {
    static contextType = GameContext
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleDelete = (id) => {
        const user = JSON.parse(localStorage.getItem("user"))
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
            headers: { "Authorization": "Bearer " + user.token }
        })
    };

    componentDidMount() {
        const [, setGame] = this.context
        const fetchData = async () => {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)

            setGame(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, name: x.name, genre: x.genre, singlePlayer: x.singlePlayer, multiplayer: x.multiplayer, platform: x.platform, release: x.release, image_url: x.image_url } }))
        }

        fetchData()
    }

    componentDidUpdate() {
        const [, setGame] = this.context
        const fetchData = async () => {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)

            setGame(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, name: x.name, genre: x.genre, singlePlayer: x.singlePlayer, multiplayer: x.multiplayer, platform: x.platform, release: x.release, image_url: x.image_url } }))
        }

        fetchData()
    }

    render() {
        const [game] = this.context

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.id - b.id,
                width: 80,
                indentSize: 100,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                ...this.getColumnSearchProps('name'),
                render: (text, game) => (
                    <>
                        <Link to={"/g/" + game.id}>{text}</Link>
                    </>
                )
            },
            {
                title: 'Genre',
                dataIndex: 'genre',
                filters: [
                    {
                        text: 'Adventure',
                        value: 'adventure',
                    },
                    {
                        text: 'Open World',
                        value: 'Open World',
                    },
                    {
                        text: 'Action',
                        value: 'Action',
                    },
                    {
                        text: 'Penembak taktis',
                        value: 'Penembak taktis',
                    },
                    {
                        text: "Beat 'em up",
                        value: "Beat 'em up",
                    },
                    {
                        text: 'Permainan piranti bergerak',
                        value: 'Permainan piranti bergerak',
                    },
                    {
                        text: 'battle royale',
                        value: 'battle royale',
                    },
                    {
                        text: 'Permainan bertahan hidup',
                        value: 'Permainan bertahan hidup',
                    },
                ],
                onFilter: (value, game) => game.genre.toLowerCase().includes(value.toLowerCase()),
                ...this.getColumnSearchProps('genre')
            },
            {
                title: 'Singleplayer',
                dataIndex: 'singlePlayer',
                width: 130,
                filters: [
                    {
                        text: 'No',
                        value: '0',
                    },
                    {
                        text: 'Yes',
                        value: '1',
                    }
                ],
                onFilter: (value, game) => game.singlePlayer == value,
                render: (value, row, index) => { return <>{value == 0 ? "No" : "Yes"}</> }
            },
            {
                title: 'Multiplayer',
                dataIndex: 'multiplayer',
                width: 130,
                filters: [
                    {
                        text: 'No',
                        value: '0',
                    },
                    {
                        text: 'Yes',
                        value: '1',
                    }
                ],
                onFilter: (value, game) => game.multiplayer == value,
                render: (value, row, index) => { return <>{value == 0 ? "No" : "Yes"}</> }
            },
            {
                title: 'Platform',
                dataIndex: 'platform',
                filters: [
                    {
                        text: 'Windows',
                        value: 'windows',
                    },
                    {
                        text: 'PlayStation 4',
                        value: 'playstation 4',
                    },
                    {
                        text: 'Nintendo Switch',
                        value: 'nintendo switch',
                    },
                    {
                        text: 'Xbox One',
                        value: 'xbox one',
                    },
                    {
                        text: 'PlayStation 5',
                        value: 'playstation 5',
                    },
                    {
                        text: 'Xbox Series X and Series S',
                        value: 'xbox seri x dan seri s',
                    },
                    {
                        text: 'Microsoft Windows',
                        value: 'microsoft windows',
                    },
                    {
                        text: 'iOS',
                        value: 'ios',
                    },
                ],
                onFilter: (value, game) => game.platform.toLowerCase().includes(value.toLowerCase()),
            },
            {
                title: 'Release',
                dataIndex: 'release',
                filters: [
                    {
                        text: '2021',
                        value: '2021',
                    },
                    {
                        text: '2020',
                        value: '2020',
                    },
                    {
                        text: '2019',
                        value: '2019',
                    },
                    {
                        text: '2018',
                        value: '2018',
                    },
                    {
                        text: '2017',
                        value: '2017',
                    },
                    {
                        text: '2016',
                        value: '2016',
                    },
                    {
                        text: '2015',
                        value: '2015',
                    },
                    {
                        text: '2014',
                        value: '2014',
                    },
                    {
                        text: '2013',
                        value: '2013',
                    },
                    {
                        text: '2012',
                        value: '2012',
                    },
                    {
                        text: '2011',
                        value: '2011',
                    },
                ],
                onFilter: (value, game) => game.release == value,
            },
            {
                title: 'Created',
                dataIndex: 'created_at',
            },
            {
                title: 'Updated',
                dataIndex: 'updated_at',
            },
            {
                title: 'Image URL',
                dataIndex: 'image_url',
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                fixed: 'right',
                width: 80,
                render: (_, game) => (
                    <>
                        <Link to={"/g/" + game.id + "/edit"}><Button type="text" style={{ margin: '.3rem 0' }} icon={<EditOutlined />}></Button></Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(game.id)}>
                            <Button type="text" style={{ margin: '.3rem 0' }} icon={<DeleteOutlined />} danger>
                            </Button>
                        </Popconfirm>
                    </>
                )
            },
        ];

        return (
            <Content style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: '#fff'
            }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Game List Table</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={game} columns={columns} scroll={{ x: 2000, y: 650 }} />
            </Content>
        )
    }

}

export default GameListTable