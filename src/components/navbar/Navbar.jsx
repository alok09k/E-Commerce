import React, { Fragment, useContext, useState } from 'react'
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import icon from '../../assets/logo.png';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import profile from '../../../src/assets/profile-2.png'

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;


  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login'
  }

  const cartItems = useSelector((state) => state.cart)

  return (
    <div className='bg-white sticky top-0 z-50'>
      {/* ... previous mobile menu code remains the same ... */}

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
          style={{ backgroundColor: mode === 'dark' ? 'rgb(62 64 66)' : '', color: mode === 'dark' ? 'white' : '', }}>
          Get free delivery on orders over ₹300
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="flex h-16 items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-2 flex lg:ml-0">
                <Link to="/" className="flex items-center" aria-label="Home">
                  <img
                    src={icon}
                    alt="E-Bharat Logo"
                    className="navbar-logo w-60 h-15"
                    style={{ filter: mode === 'dark' ? 'invert(1)' : 'none' }}
                  />
                </Link>
              </div>
            </div>

            {/* Right side - All Products, Cart, Mode Toggle, Admin, Logout, etc. */}
            <div className="flex items-center">
              {/* All Products Link */}
              <div className="hidden lg:ml-8 lg:block mr-4">
                <Link to={'/allproducts'} className="text-sm font-medium text-gray-700" style={{ color: mode === 'dark' ? 'white' : '', }}>
                  Products
                </Link>
              </div>

              {/* Cart */}
              <div className="flow-root mr-1 relative">
                {user ? (
                  // Show the cart link when the user is logged in
                  <Link
                    to={'/cart'}
                    className="group -m-2 flex items-center p-2"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 relative"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <sup className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                      {cartItems.length}
                    </sup>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                ) : (
                  // Show a login link or message when the user is not logged in
                  <Link
                    to={'/login'}
                    className="group -m-2 flex items-center p-2 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 relative"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </Link>
                )}
              </div>



              {/* Mode Toggle */}
              <div className="flex lg:ml-4 mr-3">
                <button className='' onClick={toggleMode}>
                  {mode === 'light' ?
                    (<FiSun className='' size={25} />
                    ) : 'dark' ?
                      (<BsFillCloudSunFill size={25} />
                      ) : ''}
                </button>
              </div>

              {/* Admin and Logout Links */}
              {/* Profile Dropdown */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    <img src={profile} alt="" className="w-7" />
                  </button>
                ) : (
                  <Link
                    to={'/signup'}
                    className="text-sm font-medium text-gray-700"
                    style={{ color: mode === 'dark' ? 'white' : '' }}
                  >
                    <CgProfile size={24} />
                  </Link>
                )}

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-50"
                    style={{
                      backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                      color: mode === 'dark' ? 'white' : 'black',
                      borderColor: mode === 'dark' ? '#4a4a4a' : '#e0e0e0',
                    }}
                  >
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      style={{
                        backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                        color: mode === 'dark' ? 'white' : 'black',
                      }}
                    >
                      {user?.user?.email === "chandravankumar5145@gmail.com" ? <div className="flow-root">
                        <Link to={'/dashboard'} className="-m-2 block p-2 text-black" style={{ color: mode === 'dark' ? 'white' : '', }}>
                          Admin
                        </Link>
                      </div> : ""}
                    </button>

                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      style={{
                        backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                        color: mode === 'dark' ? 'white' : 'black',
                      }}
                    >
                      {
                        user ? <div className="flow-root">
                          <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2  text-black">
                            Order
                          </Link>
                        </div> : ""
                      }
                    </button>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      style={{
                        backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                        color: mode === 'dark' ? 'white' : 'black',
                      }}
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>

              {/* Country Flag (Optional) */}
              <div className="hidden lg:ml-4 lg:flex">
                <a href="#" className="flex items-center text-gray-700">
                  <img
                    src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar