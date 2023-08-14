import { useState } from "react"
import { Avatar, Dropdown } from "flowbite-react"
import { Dashboard } from "../pages/skilled"

const links = [
    {
        name: "Dashboard",
        icon: "grid",
        link: ""
    },
    {
        name: "My Jobs",
        icon: "wrench-adjustable-circle",
        link: ""
    },
    {
        name: "My Proposals",
        icon: "envelope",
        link: ""
    },
    {
        name: "My Portfolio",
        icon: "person-circle",
        link: ""
    },
    {
        name: "History",
        icon: "clock-history",
        link: ""
    },
    {
        name: "Settings",
        icon: "wrench",
        link: ""
    },
]

const AuthLayout = () => {
    const [menu, setMenu] = useState(true);
    return (
        <>
            <section className={`main-dashboard flex h-screen overflow-hidden p-1 text-neutral-800 absolute w-min right-0 top-0 ${menu ? '' : 'active'}`}>
                <div className="left bg-white border-r border-neutral-100 border-opacity-90 p-5 w-[250px]" >
                    <div className="logo text-xl border-b pb-5 font-black text-center">PEADWUMA</div>

                    <div className="nav-links py-5">
                        {links.map(item => 
                            <div className="nav-item flex items-center active:bg-green-400 hover:bg-neutral-100 active:text-white border-2 border-transparent active:border-green-300  p-3 py-1 my-3 rounded-md bg-opacity-50" key={item.name}>
                                <div className="icon mr-3 text-xl">
                                    <i className={`bi bi-${item.icon}`}></i>
                                </div>
                                <div className="font">{item.name}</div>
                            </div>
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
                                label={<Avatar alt="User settings" img="/images/avatar.gif" rounded status="online"/>}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                    Bonnie Green
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                    name@flowbite.com
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item>
                                    Dashboard
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Earnings
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </nav>
                    <main className="p-5 overflow-y-scroll h-[90vh]">
                        <Dashboard />
                    </main>
                </div>
            </section>
        </>
    )
}

export default AuthLayout