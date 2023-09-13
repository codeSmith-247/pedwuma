import Skeleton from 'react-loading-skeleton'

// eslint-disable-next-line react/prop-types
const TableLoading = ({load=true}) => {
    if(load)
  return (
    <tbody>
        {[0,0,0,0,0,0,0,0,0,0,0].map((item, index) => 
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full">

                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <Skeleton circle={true} height={40} width={40} />
                    <div className="pl-3 block">
                        <Skeleton height={10} width={100}/>
                        <Skeleton height={10} width={100}/>
                    </div>  
                </th>
                <td className="px-6 py-4">
                    <Skeleton height={10} />
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> <Skeleton height={10} width={60}/>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <Skeleton height={10} width={50} />
                </td>
            </tr>
        )}
    </tbody>
  )
}

export default TableLoading