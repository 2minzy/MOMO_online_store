import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header>
        <nav className="nav">
          <div className="nav__logo">
          <Link to="/">MOMO</Link>
          </div>
          <ul className="nav__items">
            <li><Link to="/shop">SHOP</Link></li>
            <li><Link to="/cart">CART</Link></li>
            <li><Link to="/login">SIGN IN</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
