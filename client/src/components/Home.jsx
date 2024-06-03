import { Avatar } from 'keep-react'
import Navbar from './Navbar.jsx'

const Home = () => {
    return (
        <div className="max-w-7xl m-auto flex flex-col justify-center items-center text-center">
            <Navbar />
            <div className="mt-24">
                <h2 className="text-5xl font-bold">La comunidad de creadores <br /> más grande de Latam</h2>
                <p className="mt-6 text-lg">La forma más fácil de aceptar pagos internacionales, <br /> suscripciones y ventas de los fans.</p>
            </div>
            <div className="flex items-center font-semibold border-2 border-third p-4 rounded-full text-2xl bg-white my-12">
                <span className='text-24 font-cr-medium text-dark'>matecito.app/</span>
                <input className="border-none font-normal focus:outline-none w-full lowercase bg-transparent" type="text" name="" id="" />
                <a href='/crearcuenta'
                className="relative hidden md:block w-full ml-5 items-center justify-center overflow-hidden transition duration-100 ease-in-out outline-none py-2 text-base leading-6 text-white bg-secondary hover:bg-blue-700 rounded-full cursor-pointer font-semibold">Crear página</a>
            </div>
            <div className="mt-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/20 border border-secondary shrink-0">Es gratis y toma menos de un minuto.</span>
            </div>
            <Avatar.Group className="space-x-2 mt-12">
                <Avatar img="/avatar2.png" className='w-11'/>
                <Avatar img="/avatar3.png" className='w-11'/>
                <Avatar img="/avatar4.png" className='w-11'/>
                <Avatar img="/avatar5.png" className='w-11'/>
                <Avatar.Counter className='text-black p-2'>+9</Avatar.Counter>
            </Avatar.Group>
            <span className='text-sm mt-3 mb-[7.2rem]'>Únete a +1m de creadores</span>
        </div>
    )
}

export default Home
