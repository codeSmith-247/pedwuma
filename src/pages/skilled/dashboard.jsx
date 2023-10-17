import { useNavigate } from "react-router-dom";
import { SkilledStats, EmptyBox, TableLoading } from "../../components";
import { read, create } from "../../databank";


const Dashboard = () => {

    const {data, isLoading, isError} = read.useSkilledJobs();
    const navigate = useNavigate();

    const handleEdit = (id) => {
        create.setItem('chat_person', `${id}`);
        navigate('/chat');
    }

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
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Minimum Pay
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
                            {data && data?.data?.map(item => 
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="text-base font-semibold">{item.title}</div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.location}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.minimum_pay}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span onClick={() => handleEdit(item.employer_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Chat Employer</span>
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