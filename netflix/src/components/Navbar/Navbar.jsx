import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar/Navbar.css';
import { UserCircleIcon } from '@phosphor-icons/react';
import { useFavorites } from '../context/FavoritesContext';
import SearchBar from "../SearchBar/SearchBar";

function Navbar() {
  const { favorites } = useFavorites();
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <div className='navbar-logo'>
          <NavLink to="/">
            <img src="/logo_esteso.svg" alt="Logo esteso" />
          </NavLink>
        </div>
        <div className='navbar-links'>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/tv" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Serie TV
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Film
          </NavLink>
          <NavLink to="/favourites" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Preferiti <span className="badge">{favorites.length}</span>
          </NavLink>
        </div>
      </div>
      <div className="search"><SearchBar /></div>
      <div className='navbar-user'>
        <UserCircleIcon size={32} weight='bold' color="#E50914" />
      </div>
    </nav>

  );
}

export default Navbar;
