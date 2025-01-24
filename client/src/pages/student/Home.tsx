import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CourseSection from '../../components/student/CourseSection'
import TestimonialSection from '../../components/student/TestimonialSection'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='flex flex-col items-center space-y-5 text-center'>
      <Hero />
      <Companies />
      <CourseSection />
      <TestimonialSection />
    </div>
  )
}

export default Home