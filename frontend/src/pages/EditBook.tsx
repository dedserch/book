import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { IBook } from '../type'


const EditBook: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [publishYear, setPublishYear] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      setLoading(true)
      axios
        .get<IBook>(`http://127.0.0.1:5555/books/${id}`)
        .then((res) => {
          setTitle(res.data.title)
          setAuthor(res.data.author)
          setPublishYear(String(res.data.publishYear))
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
  }, [id])

  const handleEditBook = (): void => {
    const data: Omit<IBook, '_id'> = {
      title,
      author,
      publishYear: parseInt(publishYear, 10),
    }
    setLoading(true)
    axios
      .put(`http://127.0.0.1:5555/books/${id}`, data)
      .then(() => {
        setLoading(false)
        alert('Book edited successfully')
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
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleEditBook()
          }}
          className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'
        >
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
          <button type='submit' className='bg-sky-500 text-white p-2 rounded'>
            Save Book
          </button>
        </form>
      )}
    </div>
  )
}

export default EditBook
