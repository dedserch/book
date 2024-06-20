import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { IBook } from '../type'

export const ShowBook: React.FC = () => {
  const [book, setBook] = React.useState<IBook | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const { id } = useParams<{ id: string }>()

  React.useEffect((): void => {
    if (id) {
      setLoading(true)
      axios
        .get<IBook>(`http://127.0.0.1:5555/books/${id}`)
        .then((res) => {
          setBook(res.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
  }, [id])

  return (
    <div>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        book && (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>
          </div>
        )
      )}
    </div>
  )
}
