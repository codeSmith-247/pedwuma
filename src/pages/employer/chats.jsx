import { useState } from "react"
import { Link } from "react-router-dom"
import { Avatar, Dropdown } from "flowbite-react"

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
        link: ""
    },
    {
        name: "Settings",
        icon: "wrench",
        link: "/skilled/settings"
    },
]

const Chats = () => {
    const [menu, setMenu] = useState(true);
    return (
        <>
            <section className={`main-dashboard flex h-screen overflow-hidden p-1 text-neutral-800 absolute w-min right-0 top-0 ${menu ? '' : 'active'}`}>
                <div className="left bg-white border-r border-neutral-100 border-opacity-90 p-2 w-[250px]" >
                    <div className="logo text-xl border-b pb-5 font-black text-center">PEADWUMA</div>

                    <div className="nav-links py-2">
                        {links.map(item => 
                            <Link to={item.link} className="nav-item flex items-center active:bg-green-400 hover:bg-neutral-100 active:text-white border-2 border-transparent active:border-green-300  p-1 py-1 my-3 rounded-md bg-opacity-50" key={item.name}>
                                <div className="icon h-[40px] w-[40px] rounded-full">
                                    <img className={`bi bi-${item.icon} rounded-full object-cover h-full w-full`} src="/images/avatar.gif" />
                                </div>
                                <div className="pl-2">
                                    <div className="font-bold leading-none text-sm">{item.name}</div>
                                    <div className="text-xs pb-1 ">
                                        This is the last message sent...
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        03:45pm
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <div className={`right-dashboard  p-2 ${menu ? '' : 'active'}`}>
                    <nav className="flex items-center justify-between p-2 shadow-sm rounded-md">
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
                    <main className="p-5 flex flex-col justify-end overflow-y-scroll h-[90vh]">
                        <div className="chats">
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                    <img src="/images/avatar.gif" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Obi-Wan Kenobi
                                    <time className="text-xs opacity-50">12:45</time>
                                </div>
                                <div className="chat-bubble">You were the Chosen One!</div>
                                <div className="chat-footer opacity-50">
                                    Delivered
                                </div>
                            </div>
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                    <img src="/images/avatar.gif" />
                                    </div>
                                </div>
                                <div className="chat-header">
                                    Anakin
                                    <time className="text-xs opacity-50">12:46</time>
                                </div>
                                <div className="chat-bubble">I hate you!</div>
                                <div className="chat-footer opacity-50">
                                    Seen at 12:46
                                </div>
                            </div>
                        </div>
                        <div className="chat-input flex items-center gap-1">
                            <div className="imoji h-[35px] w-[35px] rounded-full bg-neutral-800 text-yellow-300 flex items-center justify-center">
                                <i className="bi bi-emoji-smile"></i>
                            </div>
                            <div className="share h-[35px] w-[35px] rounded-full bg-blue-400 text-white flex items-center justify-center">
                                <i className="bi bi-share"></i>
                            </div>

                            <input type="text" className="p-3 px-5 bg-gray-200 rounded-xl border-0 hover:border-0 active:border-0 focus:border-0 hover:outline-none active:outline-none focus:outline-none hover:ring-0 focus:ring-0 active:ring-0" style={{width: "calc(100% - 105px)"}}/>

                            <div className="share h-[35px] w-[35px] rounded-full bg-green-400 text-white flex items-center justify-center">
                                <i className="bi bi-send"></i>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </>
    );
}

export default Chats;