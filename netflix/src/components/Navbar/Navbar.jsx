import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar/Navbar.css';
import { UserCircleIcon } from '@phosphor-icons/react';
import { useFavorites } from '../context/FavoritesContext';
import SearchBar from "../SearchBar/SearchBar";
import { CaretDownIcon } from '@phosphor-icons/react';

function Navbar() {
  const { favorites } = useFavorites();
  const [menuActive, setMenuActive] = useState(false);

  //toggle menu per dispositivi mobili
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <div className='navbar-logo'>
          <NavLink to="/">
            <img src="/logo_esteso.svg" alt="Logo esteso" />
          </NavLink>
        </div>
        {/* menu hamburger */}
        <button className='hamburger' onClick={toggleMenu}>
          ☰
        </button>
        <div className={`navbar-links ${menuActive ? 'active' : ''}`}>
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
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            About
          </NavLink>
        </div>
      </div>
      <div className="search"><SearchBar /></div>
      <div className='navbar-user'>
        <img src={"/profile.jpg" || "/path/to/local/no-image.png"} alt="profile" />
        <CaretDownIcon size={16} weight="bold" />
      </div>
    </nav>
  );
}

export default Navbar;
