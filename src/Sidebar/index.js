import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, PlaySquareOutlined, LaptopOutlined, PlusOutlined, UnorderedListOutlined, PoweroffOutlined, KeyOutlined } from '@ant-design/icons';
import { UserProvider } from '../Auth/UserContext';
import Logout from '../Auth/Logout';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar() {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    let userString = ""
    if (currentUser != null) {
        userString = currentUser.name
    } else {
        userString = ""
    }
    return (
        <>
            <Sider
                width={250}
                className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    style={{ height: '100%', borderRight: 0 }}
                    theme="dark"
                >
                    <Menu.Item className="logo" style={{margin: '.7rem 0'}}>
                        <a href="/">
                            <h1 style={{ color: '#61dafb', margin: '0', fontFamily: "'Brush Script MT', cursive", fontSize: '1.6rem', fontWeight: 'bold' }}>
                                Final Project
                            </h1>
                        </a>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title={userString}>
                        <Menu.Item key="1" icon={<KeyOutlined />}><a href="/changepassword">Change password</a></Menu.Item>
                        <Menu.Item key="2" icon={<PoweroffOutlined />}><UserProvider><Logout /></UserProvider></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<PlaySquareOutlined />} title="Movies Editor">
                        <Menu.Item key="5" icon={<PlusOutlined />}><a href="/movies/create">Add New Movie</a></Menu.Item>
                        <Menu.Item key="6" icon={<UnorderedListOutlined />}><a href="/movies/list">Movie List Table</a></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<LaptopOutlined />} title="Games Editor">
                        <Menu.Item key="9" icon={<PlusOutlined />}><a href="/games/create">Add New Game</a></Menu.Item>
                        <Menu.Item key="10" icon={<UnorderedListOutlined />}><a href="/games/list">Game List Table</a></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </>
    );
}

export default Sidebar;
