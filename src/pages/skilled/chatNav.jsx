import { Avatar, Dropdown } from "flowbite-react";
import { read } from '../../databank';
import { Loading } from '../../components';
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const ChatNav = ({authNavs=[], setMenu, menu}) => {

    const {data, isLoading, isError} = read.useInfo();
    const user_role = parseInt(read.getItem('role'));

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

    if(user_role.toString() == '2') authNavs = links;


  return (
    <nav className="flex items-center justify-between p-2 shadow-md rounded-md">
        <Loading load={(isLoading || isError)} />
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
  )
}

export default ChatNav