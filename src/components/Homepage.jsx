import React from 'react'
import Footer from './Homepage/Footer'
import WhyChooseUs from './Homepage/WhyChooseUs'
import NewArrivals from './Homepage/NewArrivals'
import BestSellers from './Homepage/BestSeller'
import HeroSection from './Homepage/HeroSection'

const Homepage = () => {
  return (
    <div>
     <HeroSection />
      <BestSellers />
      <NewArrivals />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}

export default Homepage
