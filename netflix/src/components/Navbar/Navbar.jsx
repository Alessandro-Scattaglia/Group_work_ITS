import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import { UserCircle } from '@phosphor-icons/react';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <div className='navbar-logo'>
          <Link to="/">
            <img src="/logo_esteso.svg" alt="Logo esteso" />
          </Link>
        </div>
        <div className='navbar-links'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/series">Serie TV</NavLink>
          <NavLink to="/movies">Film</NavLink>
          <NavLink to="/games">Giochi</NavLink>
          <NavLink to="/new">Nuovi e popolari</NavLink>
          <NavLink to="/my-list">La Mia Lista</NavLink>
          <NavLink to="/browse-by-languages">Sfoglia per lingue</NavLink>
        </div>
      </div>
      <div className='navbar-user'>
        <UserCircle size={32} weight="bold" color="#E50914" />
      </div>
    </nav>

  );
}


const NavLink = ({ to, children }) => (
  <Link to={to} className="nav-link">
    {children}
  </Link>
);

export default Navbar;
