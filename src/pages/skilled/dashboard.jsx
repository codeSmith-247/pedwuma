import { SkilledStats, EmptyBox, TableLoading } from "../../components";
import { read } from "../../databank";


const Dashboard = () => {

    const {data, isLoading, isError} = read.useSkilledJobs();

  return (
    <>

        <SkilledStats />

        <EmptyBox title='No Jobs Yet' text='Visit the jobs page and add send proposals to recieve new jobs!' load={(data?.data?.length <= 0)} link={['Jobs', '/jobs']}/>
        

        {
            !(data?.data?.length <= 0) &&

            <>
                <h2 className="font-bold my-5">Recent Jobs</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <TableLoading load={(isLoading || typeof(data?.data?.map) == 'undefined'  || isError)}/>

                        <tbody>
                            { data && data?.data?.map((item, index) => 
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

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
        }

    </>
  )
}

export default Dashboard