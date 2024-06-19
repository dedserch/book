import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { NavLink } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md'
import { IBook } from '../type'

export const Home: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const DB_URL: string = 'http://127.0.0.1:5555/books'

  useEffect((): void => {
    setLoading(true)
    axios
      .get<{ data: IBook[] }>(DB_URL)
      .then((res) => {
        setBooks(res.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books list</h1>
        <NavLink to={'/books/create'}>
          <MdOutlineAddBox />
        </NavLink>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-slate-600 rounded-md'>Operation</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <NavLink to={`/books/details/${book._id}`}>
                      <BsInfoCircle />
                    </NavLink>
                    <NavLink to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit />
                    </NavLink>
                    <NavLink to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete />
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
