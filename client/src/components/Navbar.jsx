import icon from '/icon.png'
import { useUser } from '../context/UserContext.jsx'
import { checkoutMercadoPagoRequest } from '../auth/axiosAPI.js'

const Navbar = () => {

    const { user, logout } = useUser()

    const qty = 2
    const amount = 200

    const checkout = async () => {
        try {
            const res = await checkoutMercadoPagoRequest({
                qty,
                amount
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="navbar bg-main max-w-7xl m-auto lg:rounded-full lg:mt-12 lg:px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Ayuda</a></li>
                        <li><a href='/perfil'>Explorar creadores</a></li>
                    </ul>
                </div>
                <img src={icon} alt="" />
                <a className="btn btn-ghost text-xl" href='/'>
                    Matecito</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className='font-medium text-base'>Ayuda</a></li>
                    <li><a className='font-medium text-base' href='/perfil'>Explorar creadores</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a href={`./perfil/${user.user}`}
                        className="btn rounded-full bg-secondary text-white border-none hover:bg-blue-700 transition">Perfil</a>
                        :
                        <a href='./iniciarsesion'
                            className="btn rounded-full bg-secondary text-white border-none hover:bg-blue-700 transition">Login</a>
                }
            </div>
            <button onClick={logout}>Logout</button>
            <button onClick={checkout}>Checkout</button>
        </div>
    )
}

export default Navbar