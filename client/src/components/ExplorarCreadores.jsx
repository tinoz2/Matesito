import '../card.css'
import matesito from '/icon.png'
import avatar from '/avatar2.png'
import education from '/Education.svg'
import art from '/Art.svg'
import sports from '/Sports.svg'
import ciencia from '/Ciencia.svg'
import politica from '/Politica.svg'
import literatura from '/Literatura.svg'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { usersRequest } from '../auth/axiosAPI.js'
import axios from 'axios'

const ExplorarCreadores = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await usersRequest()
                console.log(res.data)
                setUsers(res.data.userFound)
                setFilteredUsers(res.data.userFound)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [])

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic)
        if (topic) {
            const filtered = users.filter(user => user.topic === topic)
            setFilteredUsers(filtered)
        } else {
            setFilteredUsers(users)
        }
    }

    const onSearch = (e) => {
        const query = e.target.value
        setSearchQuery(query)
        const filtered = users.filter(user => 
            user.user && user.user.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredUsers(filtered)
    }

    return (
        <>
            <Navbar />
            <div className='max-w-7xl m-auto mt-10 mb-[7.2rem]'>
                <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm border-2 border-third rounded-full bg-white focus:ring-blue-500 focus:border-secondary dark:placeholder-gray-400"
                            placeholder="Buscar usuario..."
                            value={searchQuery}
                            onChange={onSearch}
                            required
                        />
                    </div>
                </form>
                <div className='flex items-center space-x-10 text-center justify-center my-8'>
                    <a href="#" onClick={() => handleTopicClick('educacion')}>
                        <img src={education} className='w-16 h-16' alt="" />
                        <span className='text-sm'>Educación</span>
                    </a>
                    <a href="#" onClick={() => handleTopicClick('arte')}>
                        <img src={art} className='w-16 h-16' alt="" />
                        <span className='text-sm'>Arte</span>
                    </a>
                    <a href="#" onClick={() => handleTopicClick('deportes')}>
                        <img src={sports} className='w-16 h-16' alt="" />
                        <span className='text-sm'>Deportes</span>
                    </a>
                    <a href="#" onClick={() => handleTopicClick('ciencia')}>
                        <img src={ciencia} className='w-16 h-16' alt="" />
                        <span className='text-sm'>Ciencia</span>
                    </a>
                    <a href="#" onClick={() => handleTopicClick('politica')}>
                        <img src={politica} className='w-16 h-16' alt="" />
                        <span className='text-sm'>Politica</span>
                    </a>
                    <a href="#" onClick={() => handleTopicClick('literatura')}>
                        <img src={literatura} className='w-16 h-16' alt="" />
                        <span className='text-sm'>Literatura</span>
                    </a>
                </div>
                <main className='grid grid-cols-4'>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <a href={`/perfil/${user.user}`} key={user._id} className='my-4'>
                                <article className="card-client">
                                    <span className="px-3 py-1 text-xs font-medium rounded-full text-secondary bg-third/20 border border-third shrink-0 capitalize">{user.topic}</span>
                                    <div className="user-picture">
                                        <img src={avatar} alt="" />
                                    </div>
                                    <p className="name-client">
                                        <span>{user.user}</span>
                                    </p>
                                    <div className='mt-2'>
                                        <hr />
                                    </div>
                                    <div className='flex items-center justify-center mt-2'>
                                        <img className='w-12' src={matesito} alt="" />
                                        <span className='text-sm ml-1'>0</span>
                                        <p className='text-sm ml-1'>Matesitos</p>
                                    </div>
                                </article>
                            </a>
                        ))
                    ) : (
                        <p className="col-span-4 text-center text-gray-500">Tópico no encontrado</p>
                    )}
                </main>
            </div>
        </>
    )
}

export default ExplorarCreadores