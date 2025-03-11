import React, { useEffect } from 'react'
import Header from '../components/Header.jsx'
import Slider from '../components/Slider'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import Slid from '../components/Pages/Slid'
const Home = ({setLoginpop}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header/>
      <Slider/>
     <Slid/>
      <Cards setLoginpop={setLoginpop}/>
      <Footer/>
    </div>
  )
}

export default Home