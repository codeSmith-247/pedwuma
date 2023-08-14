

const stats = [
    {
        name: "Jobs Recieved",
        value: 2345,
        icon: "briefcase"
    },
    {
        name: "Active Jobs",
        value: 1045,
        icon: "briefcase"
    },
    {
        name: "Total Revenue",
        value: 2345,
        icon: "briefcase"
    },
    {
        name: "Revenue This Month",
        value: 2345,
        icon: "briefcase"
    },
    {
        name: "Total Profile Views",
        value: 2345,
        icon: "briefcase"
    },
    {
        name: "Views This Week",
        value: 2345,
        icon: "briefcase"
    },
    {
        name: "Total Proposals",
        value: 2345,
        icon: "briefcase"
    },
    {
        name: "Proposals This Week",
        value: 2345,
        icon: "briefcase"
    }
];

const Dashboard = () => {
  return (
    <>
        <section className="grid-box-fit gap-4" style={{"--width": "200px"}}>
            {stats.map(item => 
                <div className="shadow-md hover:shadow-lg rounded-md p-2 grid grid-cols-10 " key={item}>
                    <div className="col-span-7 flex flex-col">
                        <b className="font-bold">{item.name}</b>
                        <span className="orb text-4xl">{item.value}</span>
                    </div>

                    <div className="icon col-span-3 flex items-center justify-center text-4xl">
                        <i className={`bi bi-${item.icon}`}></i>
                    </div>
                </div>
            )}
        </section>

        <h2 className="font-bold my-5">Recent Jobs</h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[0,0,0,0,0,0,0,0,0,0,0].map(item => 
                        <tr key={item} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/images/avatar.gif" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>  
                            </th>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    </>
  )
}

export default Dashboard