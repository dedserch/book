import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton: React.FC = () =>{
  const destination: string = '/'
  return (
    <div className='flex'>
      <NavLink to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrowLeft />
      </NavLink>
    </div>
  )
}

export default BackButton