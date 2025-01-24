import React from 'react'
import { assets } from '../../assets/assets'

const Companies: React.FC = () => {
  return (
    <div className='pt-16'>
        <p className='text-gray-600 text-base md:text-lg text-center font-semibold'>Trusted by learners from</p>
        <div className='flex flex-wrap justify-center items-center gap-6 md:gap-10 mt-5 md:mt-10'>
          <img src={assets.microsoft} alt="Microsoft" className='w-20 md:w-28' />
          <img src={assets.walmart} alt="Walmart" className='w-20 md:w-28' />
          <img src={assets.accenture} alt="Accenture" className='w-20 md:w-28' />
          <img src={assets.adobe} alt="adobe" className='w-20 md:w-28' />
          <img src={assets.paypal} alt="paypal" className='w-20 md:w-28' />
        </div>
    </div>
  )
}

export default Companies