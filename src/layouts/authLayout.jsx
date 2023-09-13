import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import {read} from '../databank';
import {Loading} from '../components';
import Swal from 'sweetalert2';

const links = [
    {
        name: "Dashboard",
        icon: "grid",
        link: "/skilled"
    },
    {
        name: "My Jobs",
        icon: "wrench-adjustable-circle",
        link: "/skilled/jobs"
    },
    {
        name: "My Proposals",
        icon: "envelope",
        link: "/skilled/proposals"
    },
    {
        name: "My Portfolio",
        icon: "person-circle",
        link: "/skilled/portfolio"
    },
    {
        name: "Chats",
        icon: "chat",
        link: "/chats"
    },
    {
        name: "Settings",
        icon: "wrench",
        link: "/skilled/settings"
    },
];

// eslint-disable-next-line react/prop-types
const AuthLayout = ({id, authNavs = links}) => {

    const user_role = parseInt(read.getItem('role'));
    const [menu, setMenu] = useState(true);

    const {data, isLoading, isError} = read.useInfo();

    // console.log(data);

    if(data?.status === 'error'){
        Swal.fire({
            icon: data?.status,
            title: data?.title,
            text: data?.message,
        }).then(() => location.href = '/login');
    }

    if(isLoading || isError) return <Loading load={true} />

    if(user_role === id) {
        return (
            <>
                <section className={`main-dashboard flex h-screen overflow-hidden p-1 text-neutral-800 absolute w-min right-0 top-0 ${menu ? '' : 'active'}`}>
                    <div className="left bg-white border-r border-neutral-100 border-opacity-90 p-5 w-[250px]" >
                        <Link to='/' className="logo text-xl border-b pb-5 font-black text-center block w-full">PEADWUMA</Link>
    
                        <div className="nav-links py-5">
                            {authNavs.map(item => 
                                <Link to={item.link} className="nav-item flex items-center active:bg-green-400 hover:bg-neutral-100 active:text-white border-2 border-transparent active:border-green-300  p-3 py-1 my-3 rounded-md bg-opacity-50" key={item.name}>
                                    <div className="icon mr-3 text-xl">
                                        <i className={`bi bi-${item.icon}`}></i>
                                    </div>
                                    <div className="font">{item.name}</div>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className={`right-dashboard  p-2 ${menu ? '' : 'active'}`}>
                        <nav className="flex items-center justify-between p-2 shadow-md rounded-md">
                            <div className="menu-btn flex items-center justify-center text-3xl" onClick={() => setMenu(!menu)}>
                                <i className="bi bi-list"></i>
                            </div>
    
                            <div className="flex items-center">
                                <Dropdown

                                    inline
                                    label={<Avatar className="img-cover" alt="User settings" img={`${data?.image_endpoint}/${data?.data?.media}`} rounded status="online"/>}
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                        {data?.data?.fullname}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                        {data?.data?.email}
                                        </span>
                                    </Dropdown.Header>
                                    <Link to={authNavs[0].link}>
                                        <Dropdown.Item>
                                            Dashboard
                                        </Dropdown.Item>
                                    </Link>
                                    <Link to={authNavs[authNavs.length - 1].link}>
                                        <Dropdown.Item>
                                            Settings
                                        </Dropdown.Item>
                                    </Link>
                                    <Dropdown.Divider />
                                    <Link to={'/'}>
                                        <Dropdown.Item>
                                            Home
                                        </Dropdown.Item>
                                    </Link>
                                    <Link to={'/logout'}>
                                        <Dropdown.Item>
                                            Log Out
                                        </Dropdown.Item>
                                    </Link>
                                </Dropdown>
                            </div>
                        </nav>
                        <main className="p-5 overflow-y-scroll h-[90vh]">
                            <Outlet />
                        </main>
                    </div>
                </section>
            </>
        )
    }

    else 
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Link to="/">
                <img className="h-screen w-full object-contain" src="/images/denied.gif" alt="access denied..." />
            </Link>
        </div>
    )
}

export default AuthLayout