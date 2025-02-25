import React from 'react'
import './Main.css'

function Main() {
  return (
    <body>
        <section id="main">
            <h1 className="main__sub-title">
                Discover your next Favorite Film
            </h1>

            <div className="search">
                <textarea type="text" className="search__input" placeholder='Find-a-Film'/>
            </div>
        </section>
    </body>
  )
}

export default Main