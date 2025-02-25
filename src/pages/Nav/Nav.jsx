import React from 'react';
import './Nav.css';
import { Link, BrowserRouter as Router, Route, Routes, } from 'react-router-dom';


function Home() {
    return <h2>Welcome to the Home Page!</h2>;
  }
  
  function Movies() {
    return <h2>Here are some great movies!</h2>;
  }
  
  function Tv() {
    return <h2>Check out these awesome TV Shows!</h2>;
  }
  
  function Watchlist() {
    return <h2>Your Watchlist is here!</h2>;
  }
  
  function SignIn() {
    return <h2>Please Sign In!</h2>;
  }

function Nav() {
  return (
    <>
        
            <section id="head">
                <header className="main__header">
                    <div className="logo__container">
                        <img src={`${process.env.PUBLIC_URL}/FaFlogo.svg`} alt="FaF Logo" className='logo'/>
                        <h1 className="app__title">
                            Find-a-Film
                        </h1>
                    </div>
                        <h2 className="app__sub-title">Unlock a World of Films</h2>
                    <div className="header__links">
                        <Router>
                            <nav className="header__links">
                                <Link to="/" className="header__link underline--hover">Home</Link>
                                <Link to="/Movies" className="header__link underline--hover">Movies</Link>
                                <Link to="/Tv" className="header__link underline--hover">TV Shows</Link>
                                <Link to="/Watchlist" className="header__link underline--hover">Watchlist</Link>
                                <Link to="/SignIn" className="header__link underline--hover">Sign In</Link>
                            </nav>

                            <Routes>
                                <Route path="/" exact component={Home} />
                                <Route path="/Movies" component={Movies} />
                                <Route path="/Tv" component={Tv} />
                                <Route path="/Watchlist" component={Watchlist} />
                                <Route path="/SignIn" component={SignIn} />
                            </Routes>
                        </Router>
                    </div>
                </header>
            </section>
        
    </>
  )
}

export default Nav