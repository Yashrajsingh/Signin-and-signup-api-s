import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector(state => state.user); // Destructure currentUser from the Redux store

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Yashraj</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button className='sm:hidden text-slate-700 focus:outline-none' onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Navigation and Search Bar */}
        <div className={`sm:flex items-center ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
          <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input 
              type='text' 
              placeholder='Search...' 
              className='bg-transparent focus:outline-none w-24 sm:w-64'
              aria-label='Search'
            />
            <FaSearch className='text-slate-600'/>
          </form>

          <ul className='flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0'>
            <Link to='/' onClick={() => setIsMenuOpen(false)}> 
              <li className='text-slate-700 hover:underline'>Home</li>
            </Link>
            <Link to='/aboutus' onClick={() => setIsMenuOpen(false)}>
              <li className='text-slate-700 hover:underline'>About</li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img src={currentUser.avatar} alt='profile' className='w-8 h-8 rounded-full object-cover'/>
              ) : (
                <li className='text-slate-700 hover:underline'>Sign-in</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

