import banner from '/banner.jpg'
import icon from '/avatar2.png'
import ig from '/ig.svg'
import tw from '/tw.svg'
import yt from '/yt.svg'
import logo from '/icon.png'
import mp from '/mp.png'
import { useEffect, useState } from 'react'
import { checkoutMercadoPagoRequest, profileRequest } from '../auth/axiosAPI.js'
import { Link, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import UserNotFound from '../helpers/UserNotFound.jsx'
import Loading from '../helpers/Loading.jsx'

const Perfil = () => {

    const { username } = useParams()
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [matesitos, setMatesitos] = useState(1)
    const { user, userId, userLoading } = useUser()

    useEffect(() => {
        const userData = async () => {
            try {
                const res = await profileRequest(username)
                setProfileData(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        userData()
    }, [username])

    const handleMatesitosChange = (value) => {
        if (value < 1) {
            setMatesitos(1);
        } else if (value > 99) {
            setMatesitos(99);
        } else {
            setMatesitos(value);
        }
    };

    const handleInputChange = (event) => {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 99) {
            value = 99;
        }
        setMatesitos(value);
    };

    const checkout = async () => {
        try {
            const res = await checkoutMercadoPagoRequest({
                qty: matesitos,
                token: profileData.mercadopagoAccessToken
            })
            window.location.href = res.data
        } catch (error) {
            console.log(error)
        }
    }

    if (loading || userLoading) return <Loading />

    if (!profileData) return <UserNotFound />

    return (
        <section className="relative bg-white pb-12">
            <div>
                <Link className="fixed bg-white p-4 m-2" style={{borderRadius: '50%'}} to='/perfil'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
                </Link>
            </div>
            <div>
                <img src={banner} className='w-full h-72' alt="" />
            </div>

            <div className="absolute top-52 left-1/2 transform -translate-x-1/2 translate-y-1/12">
                <img src={icon} className='w-40 rounded-full border-4' alt="" />
            </div>
            <div className='mt-24 flex justify-center flex-col items-center'>
                <div className='flex items-center'>
                    <h2 className='text-3xl font-semibold'>{profileData.user}</h2>
                </div>
                <a href="" className='text-secondary my-2'>https://www.youtube.com/watch?v=EzTUkHfCtjA&t=63s</a>
                <span className='text-fourth text-lg'>387 recibidos</span>
            </div>
            <div className='mt-6'>
                <hr className='hr-2' />
            </div>

            <div className="max-w-5xl m-auto mt-4">
                {
                    userId === profileData.id ? <Link className='flex justify-center items-center my-4 font-semibold text-lg' to='./settings'>Editar perfil <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    </Link> : null
                }
                <div className='border p-4 rounded-lg flex flex-col justify-center items-center'>
                    <p>Oye 👋 Acabo de crear una página aquí. ¡Ahora puedo recibir pagos globales!</p>
                    <div className='flex items-center space-x-4 mt-3'>
                        <a href=""><img src={ig} className='w-7 h-7' alt="" /></a>
                        <a href=""><img src={tw} className='w-7 h-7' alt="" /></a>
                        <a href=""><img src={yt} className='w-7 h-7' alt="" /></a>
                    </div>
                </div>
                <div className='flex justify-between mt-8'>
                    <div className="space-y-4">
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                        <div className='border p-4 rounded-lg w-[30rem]'>
                            <p>Alguien compró 1 matesito</p>
                        </div>
                    </div>
                    {
                        profileData.mercadopagoAccessToken ? <div className='border p-4 rounded-lg space-y-4 h-full'>
                            <div className='flex items-center border border-third p-4 rounded-lg space-x-3'>
                                <img src={logo} className='w-16 h-16' alt="" />
                                <span>x</span>
                                <button className='text-lg border h-10 w-10 justify-center items-center' style={{ borderRadius: '50%' }} onClick={() => handleMatesitosChange(1)}>1</button>
                                <button className='text-lg border h-10 w-10' style={{ borderRadius: '50%' }} onClick={() => handleMatesitosChange(3)}>3</button>
                                <button className='text-lg border h-10 w-10' style={{ borderRadius: '50%' }} onClick={() => handleMatesitosChange(5)}>5</button>
                                <span>o</span>
                                <input className='border p-2 text-center rounded-lg border-third bg-white w-12' type="text" value={matesitos} onChange={handleInputChange} />
                            </div>
                            <div className='flex flex-col'>
                                <input className='border p-2 rounded-lg border-third bg-white'
                                    type="text"
                                    placeholder='Nombre (Opcional)' />
                                <textarea className='border p-2 rounded-lg border-third bg-white mt-2'
                                    name="" id="" cols="20" rows="3" placeholder='Mensaje (Opcional)'></textarea>
                            </div>
                            <div className='flex justify-between items-center'>
                                <hr className='hr-3 w-1/6' />
                                <span className='text-sm'>Invitame {matesitos} matesitos ({matesitos * 100} ARS)</span>
                                <hr className='hr-3 w-1/6' />
                            </div>
                            <div className='flex justify-center items-center flex-col'>
                                <button onClick={checkout} className='p-2 rounded-lg text-white font-semibold w-full bg-secondary'>{matesitos * 100} ARS</button>
                                <img src={mp} className='mt-4 w-1/3' alt="" />
                            </div>
                        </div>
                            :
                            <p>Este usuario no tiene Mercado Pago conectado.</p>
                    }
                </div>
            </div>
        </section>
    )
}

export default Perfil