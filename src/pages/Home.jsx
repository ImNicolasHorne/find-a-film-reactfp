import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'


function Home() {
  return (
    <>
        <section id="main">
            <header className="main__header">
            <div className="logo__container">
                <img src={`${process.env.PUBLIC_URL}/FaFlogo.svg`} alt="FaF Logo" className='logo'/>
                <h1 className="app__title">
                    Find-a-Film
                </h1>
            </div>
            <div className="header__links">
                <Link>Home</Link>
                <Link>Movies</Link>
                <Link>TV Shows</Link>
                <Link>Watchlist</Link>
                <Link>Sign In</Link>
            </div>
            </header>
        </section>
    </>
  )
}

export default Home