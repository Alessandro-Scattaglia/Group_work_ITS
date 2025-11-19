import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import { UserCircleIcon } from '@phosphor-icons/react';
import { useFavorites } from '../context/FavoritesContext'; 
import SearchBar from "../SearchBar/SearchBar";

function Navbar() {
  const {favorites} = useFavorites();
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
          <NavLink to="/favorites">Preferiti <span className="badge">{favorites.length}</span></NavLink>
        </div>
      </div>
      <div className="search"><SearchBar /></div>
      <div className='navbar-user'>
        <UserCircleIcon size={32} weight='bold' color="#E50914" />
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
