import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Home from './Home';
import { MovieProvider } from './Movie/MovieContext';
import { GameProvider } from './Game/GameContext';
import Movies from './Movies/index';
import MovieListTable from './Movie/MovieListTable';
import MovieDetail from './MovieDetail/index';
import Navbar from './Navbar/index';
import FooterSection from './Footer/index';
import { UserProvider } from "./Auth/UserContext";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ChangePassword from './Auth/ChangePassword';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MovieForm from './Movie/MovieForm';
import GameForm from './Game/GameForm';
import EditMovieForm from './Movie/EditMovieForm';
import Games from './Games';
import GameDetail from './GameDetail/index';
import GameListTable from './Game/GameListTable';
import EditGameForm from './Game/EditGameForm';

function App() {
  const loggedIn = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          {loggedIn ? <Sidebar /> : <></>}
          <Layout className="site-layout">
            <Navbar />
            <Switch>
              <Route path="/g/:slug/edit">
                <GameProvider>
                  {loggedIn ? <EditGameForm /> : <Redirect to="/" />}
                </GameProvider>
              </Route>
              <Route path="/games/create">
                <GameProvider>
                  {loggedIn ? <GameForm /> : <Redirect to="/" />}
                </GameProvider>
              </Route>
              <Route path="/games/list">
                <GameProvider>
                  {loggedIn ? <GameListTable /> : <Redirect to="/" />}
                </GameProvider>
              </Route>
              <Route path="/games">
                <Games />
              </Route>
              <Route path="/g/:slug">
                <GameDetail />
              </Route>
              <Route path="/m/:slug/edit">
                <MovieProvider>
                  {loggedIn ? <EditMovieForm /> : <Redirect to="/" />}
                </MovieProvider>
              </Route>
              <Route path="/movies/create">
                <MovieProvider>
                  {loggedIn ? <MovieForm /> : <Redirect to="/" />}
                </MovieProvider>
              </Route>
              <Route path="/movies/list">
                <MovieProvider>
                  {loggedIn ? <MovieListTable /> : <Redirect to="/" />}
                </MovieProvider>
              </Route>
              <Route path="/movies">
                <Movies />
              </Route>
              <Route path="/m/:slug">
                <MovieDetail />
              </Route>
              <Route path="/register">
                <UserProvider>
                  {loggedIn ? <Redirect to="/" /> : <Register />}
                </UserProvider>
              </Route>
              <Route path="/login">
                <UserProvider>
                  {loggedIn ? <Redirect to="/" /> : <Login />}
                </UserProvider>
              </Route>
              <Route path="/changepassword">
                <UserProvider>
                  {loggedIn ? <ChangePassword /> : <Redirect to="/" />}
                </UserProvider>
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            <FooterSection />
          </Layout>
        </Router>
      </Layout>
    </>
  );
}

export default App;
