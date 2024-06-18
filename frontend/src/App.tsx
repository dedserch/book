import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

function App() {
  return (
    <div className='wrapper'>
      <RouterProvider router= {router}/>
    </div>
  )
}

export default App
