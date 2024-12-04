import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import chatbot from '../../assets/chatbot.png'
import  { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Main from '../chatbot/Main'


function Layout({ children }) {

  const context = useContext(myContext)
  const { showBot,setShowBot} = context



  return (
    <div className="relative">
      {
        showBot ? <Main/>: <></>
      }
      <Navbar />
      <div className="content">
        {children}
      </div>
      {/* Fixed chatbot image */}
      <div  className="fixed  bottom-6 bg-slate-300 right-6 z-50 w-20 h-20 cursor-pointer rounded-full ">
      <img 
        src={chatbot} 
        alt="Chatbot" 
        className="fixed bottom-6 right-6 z-50 w-16 h-16 mr-2 mb-2 cursor-pointer" 
        onClick={() => setShowBot((prev) => !prev)}
      />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
