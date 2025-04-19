import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import  { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Main from '../chatbot/Main'


function Layout({ children }) {

  const context = useContext(myContext)



  return (
    <div className="relative">
      
      <Main/>
    
      <Navbar />
      <div className="content">
        {children}
      </div>

      </div>
      <Footer />
    </div>
  )
}

export default Layout
