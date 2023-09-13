// import { Search } from "../../components/"

const Proposals = () => {
    return (
      <>
        <h2 className="font-bold text-2xl mb-3">Your Proposals</h2>

        <div className="grid grid-cols-10 gap-5 mb-5">
            
            <div className="col-span-8 flex gap-2">
                <input type="text" placeholder="Type here" className="input input-bordered w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400 " />
                <button className="btn w-[50px] h-[40px] flex items-center justify-center bg-green-400 hover:bg-green-500 text-xl text-white">
                    <i className="bi bi-search"></i>
                </button>
            </div>

            <select className="select select-bordered w-full max-w-xs col-span-2 outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400">
                <option selected>Recent</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Ongoing</option>
            </select>
        </div>
  
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
                    {[0,0,0,0,0,0,0,0,0,0,0].map((item, index) => 
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
    )
  }
  
  export default Proposals