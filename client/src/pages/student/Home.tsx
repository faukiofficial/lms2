import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='flex flex-col items-center space-y-5 text-center'>
      <Hero />
      <Companies />
    </div>
  )
}

export default Home