import React from "react"
import { Layout, Table, Input, Button, Space, Popconfirm, Breadcrumb } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { MovieContext } from "./MovieContext"
import axios from "axios"
import {
    Link,
} from "react-router-dom";

const { Content } = Layout;

class MovieListTable extends React.Component {
    static contextType = MovieContext
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
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
            headers: { "Authorization": "Bearer " + user.token }
        })
    };

    componentDidMount() {
        const [, setMovie] = this.context
        const fetchData = async () => {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

            setMovie(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, title: x.title, description: x.description, year: x.year, duration: x.duration, genre: x.genre, rating: x.rating, review: x.review, image_url: x.image_url } }))
        }

        fetchData()
    }

    componentDidUpdate() {
        const [, setMovie] = this.context
        const fetchData = async () => {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

            setMovie(result.data.map(x => { return { id: x.id, created_at: x.created_at, updated_at: x.updated_at, title: x.title, description: x.description, year: x.year, duration: x.duration, genre: x.genre, rating: x.rating, review: x.review, image_url: x.image_url } }))
        }

        fetchData()
    }

    render() {
        const [movie] = this.context

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.id - b.id,
                width: 70,
                indentSize: 100,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                ...this.getColumnSearchProps('title'),
                render: (text, movie) => (
                    <>
                        <Link to={"/m/" + movie.id}>{text}</Link>
                    </>
                )
            },
            {
                title: 'Year',
                dataIndex: 'year',
                width: 80,
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
                onFilter: (value, movie) => movie.year == value,
            },
            {
                title: 'Duration',
                dataIndex: 'duration',
                width: 110,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.duration - b.duration,
                render: (value, row, index) => { return <>{value + " Minutes"}</> }
            },
            {
                title: 'Genre',
                dataIndex: 'genre',
                filters: [
                    {
                        text: 'Action',
                        value: 'Action',
                    },
                    {
                        text: 'Drama',
                        value: 'Drama',
                    },
                    {
                        text: 'Roman',
                        value: 'Roman',
                    },
                    {
                        text: 'Laga',
                        value: 'Laga',
                    },
                    {
                        text: 'Horror',
                        value: 'Horror',
                    },
                    {
                        text: 'Adventure',
                        value: 'Adventure',
                    },
                    {
                        text: 'Fantasy',
                        value: 'Fantasy',
                    },
                    {
                        text: 'Cerita seru',
                        value: 'Cerita seru',
                    },
                ],
                onFilter: (value, movie) => movie.genre.toLowerCase().includes(value.toLowerCase()),
            },
            {
                title: 'Rating',
                dataIndex: 'rating',
                width: 100,
                filters: [
                    {
                        text: '10',
                        value: '10',
                    },
                    {
                        text: '9',
                        value: '9',
                    },
                    {
                        text: '8',
                        value: '8',
                    },
                    {
                        text: '7',
                        value: '7',
                    },
                    {
                        text: '6',
                        value: '6',
                    },
                    {
                        text: '5',
                        value: '5',
                    },
                    {
                        text: '4',
                        value: '4',
                    },
                    {
                        text: '3',
                        value: '3',
                    },
                    {
                        text: '2',
                        value: '2',
                    },
                    {
                        text: '1',
                        value: '1',
                    },
                    {
                        text: '0',
                        value: '0',
                    },
                ],
                onFilter: (value, movie) => movie.rating == value,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                ellipsis: true,
                ...this.getColumnSearchProps('title')
            },
            {
                title: 'Review',
                dataIndex: 'review',
                ellipsis: true,
                ...this.getColumnSearchProps('title')
            },
            {
                title: 'Created',
                width: 140,
                dataIndex: 'created_at',
            },
            {
                title: 'Updated',
                width: 140,
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
                render: (_, movie) => (
                    <>
                        <Link to={"/m/" + movie.id + "/edit"}><Button type="text" style={{ margin: '.3rem 0' }} icon={<EditOutlined />}></Button></Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(movie.id)}>
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
                    <Breadcrumb.Item>Movie List Table</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={movie} columns={columns} scroll={{ x: 2000, y: 650 }} />
            </Content>
        )
    }

}

export default MovieListTable