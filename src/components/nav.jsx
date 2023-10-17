/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {read, urls} from '../databank';




const Nav = ({navLinks = null}) => {

    const [menuState, setMenuState] = useState("-right-[300vw]");

    const [lang, setLang] = useState('el');

    const { pathname } = useLocation();

    useEffect(() => {
        setLang(read.getItem('lang'));
    }, [pathname])

    const [role, setRole] = useState(null);
    let auth_link = null;

    if(role == 1) {
        auth_link = {
            name: 'Dashboard',
            link: urls.url + '/employer',
            m: role,
        }
    }

    if(role == 2) {
        auth_link = {
            name: 'Dashboard',
            link: `${urls.url}/skilled`,
            m: role
        }
    }
    

    if(role === null)
        setRole(parseInt(read.getItem('role')));

    const links = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Find Jobs',
            link: '/jobs',
        },
        {
            name: 'Our Workers',
            link: '/people/all',
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
            name: auth_link == null ? 'Log In' : auth_link.name,
            link: auth_link == null ? '/login' : auth_link.link,
        },
    ];

    if(navLinks === null) navLinks = links;



    // console.log('role', role, 'auth_link', auth_link);

    return (
        <nav className="border p-3 py-2 flex justify-between items-center">
            <div className="flex items-center">
                <div className="logo font-black text-lg h-[50px] w-[50px] overflow-hidden rounded-full mx-5 mr-1">
                    <img src="/images/logo.jpg" className="object-cover h-full w-full scale-150" />
                </div>
                <div className="flex items-center gap-1">
                    <select onChange={(e) => e.target.value == 'en' ? document.querySelector('.to-english')?.click() : document.querySelector('.to-french')?.click() } className="select select-bordered select-xs w-full max-w-xs select-small">
                        <option selected={lang == 'en' ? true : false} value="en">English</option>
                        <option selected={lang == 'fr' ? true : false} value="fr">French</option>
                    </select>
                </div>
            </div>
            <div className={`nav-links fixed text-white md:text-neutral-900 md:static top-0 h-screen md:h-max backdrop-blur-3xl bg-black bg-opacity-95 md:bg-opacity-0 z-20 min-w-[300px] p-5 md:p-0 items-center md:flex transform scale-95 rounded-md ${menuState}`}>
                <div className="flex justify-end">
                    <div className="flex justify-center items-center rounded-md w-[30px] h-[30px] bg-red-500 md:hidden" onClick={() => setMenuState("-right-[100vw]")}>
                        <i className="bi bi-x-lg"></i>
                    </div>
                </div>
                {navLinks.map( navItem => <Link className={`block font-bold px-5 py-2 my-2 md:my-0  hover:backdrop-blur-3xl hover:bg-white hover:text-black transition duration-75 rounded-md ${navItem.class ?? ""}`} key={navItem.name} to={navItem.link}><span>{navItem.name}</span></Link> )}
                <Link className={`relative font-bold px-5  my-2 md:my-0  rounded-md border-2 border-green-400 hover:border-green-300 btn  items-center justify-center hover:bg-green-500 overflow-hidden text-center bg-green-400 before:bg-green-300 text-white`} to={ auth_link == null ? "signup" : 'logout'}><span>{auth_link == null ? "Sign Up" : "Log Out"}</span></Link>
            </div>

            <div className="menu-btn flex items-center justify-center hover:bg-green-500 hover:text-white border-2 rounded-md text-2xl px-1 md:hidden" onClick={() => setMenuState("right-0")}>
                <i className="bi bi-list"></i>
            </div>
        </nav>
    )
}

export default Nav