import React from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IBook } from '../type'

export const CreateBook: React.FC = () => {
  const [title, setTitle] = React.useState<string>('')
  const [author, setAuthor] = React.useState<string>('')
  const [publishYear, setPublishYear] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()

  const handleSaveBook = (): void => {
    const data: Omit<IBook, '_id'> = {
      title,
      author,
      publishYear: parseInt(publishYear, 10),
    }
    setLoading(true)
    axios
      .post('http://127.0.0.1:5555/books', data)
      .then(() => {
        setLoading(false)
        alert('Book created successfully')
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error occurred. Please check console')
        console.log(error)
      })
  }

  return (
    <div>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSaveBook(); }} className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input 
              type='text' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className='border-2 p-2'
              required
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input 
              type='text' 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              className='border-2 p-2'
              required
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input 
              type='number' 
              value={publishYear} 
              onChange={(e) => setPublishYear(e.target.value)} 
              className='border-2 p-2'
              required
            />
          </div>
          <button 
            type='submit' 
            className='bg-sky-500 text-white p-2 rounded'>
            Save Book
          </button>
        </form>
      )}
    </div>
  )
}
