/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link } from "react-router-dom"

const links = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'Jobs',
        link: '/jobs',
    },
    {
        name: 'Skills',
        link: '/skills',
    },
    {
        name: 'About',
        link: '/about',
    },
    {
        name: 'Contact us',
        link: '#contact',
    },
    {
        name: 'Log In',
        link: '',
    },
];

const Nav = ({navLinks = links}) => {

    const [menuState, setMenuState] = useState("-right-[100vw]");

    return (
        <nav className="border p-3 py-2 flex justify-between items-center">
            <div className="logo font-black text-lg">PEADWUMA</div>
            <div className={`nav-links fixed text-white md:text-neutral-900 md:static top-0 h-screen md:h-max backdrop-blur-3xl bg-black bg-opacity-95 md:bg-opacity-0 z-20 min-w-[300px] p-5 md:p-0 items-center md:flex transform scale-95 rounded-md ${menuState}`}>
                <div className="flex justify-end">
                    <div className="flex justify-center items-center rounded-md w-[30px] h-[30px] bg-red-500 md:hidden" onClick={() => setMenuState("-right-[100vw]")}>
                        <i className="bi bi-x-lg"></i>
                    </div>
                </div>
                {navLinks.map( navItem => <Link class={`block font-bold px-5 py-2 my-2 mx-1 md:my-0  hover:backdrop-blur-3xl hover:bg-white hover:text-black transition duration-75 rounded-md ${navItem.class ?? ""}`} key={navItem.name} to={navItem.link}><span>{navItem.name}</span></Link> )}
                <Link class={`block font-bold px-5 py-2 my-2 mx-1 md:my-0  rounded-md border-2 border-green-400 hover:border-green-300 btnn overflow-hidden text-center bg-green-400 before:bg-green-300`} to="signup"><span>Sign Up</span></Link>
            </div>

            <div className="menu-btnn border-2 rounded-md text-2xl px-1 md:hidden" onClick={() => setMenuState("right-0")}>
                <i className="bi bi-list"></i>
            </div>
        </nav>
    )
}

export default Nav