// import { Search } from "../../components/"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { read, create } from '../../databank';
import { TableLoading, EmptyBox, Pagination } from '../../components';
import Calender from './calender';
import AppointmentModal from './appointmentModal';

const Appointment = () => {

    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [grid, setGrid] = useState(false);
    const [page, setPage] = useState(1);
    const [appointmentId, setAppointmentId] = useState(null);
    const navigate = useNavigate();

    const { data, isLoading, isError } = read.useAppointments(page, searchType);

    const handleEdit = (id) => {
        create.setItem('job_id', `${id}`);
        navigate('/employer/job/edit');
    }

    const handleSearch = () => {
        setSearchResult([]);
        setSearchLoading(true);

        if (search.replaceAll(' ', '') === '') {
            setSearchLoading(false);
            return false;
        }

        read.searchEmployerJobs(search).then((response) => {
            // console.log('search_response', response);
            setSearchLoading(false);

            if (response?.data?.status !== 'success') return false;

            // console.log(response?.data);

            setSearchResult(response?.data);
        })
    }

    // console.log(data);
    
    return (
        <>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => setGrid(!grid)} className={`btn btn-sm border-2 border-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 ${grid ? ' bg-green-100 text-green-400 ' : ' bg-green-400 text-white '}`}>
                    <i className="bi bi-grid-fill"></i>
                  </button>
                  <button onClick={() => setGrid(!grid)} className={`btn btn-sm border-2 border-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 ${!grid ? ' bg-green-100 text-green-400 ' : ' bg-green-400 text-white '}`}>
                    <i className="bi bi-calendar-fill"></i>
                  </button>
                </div>
            </div>

            {
              grid &&
              <>
                <Calender data={data?.data} />
              </>
            }

            {
              !grid &&
              <>
                <div className="grid grid-cols-10 gap-5 mb-5">

                    <div className="col-span-8 flex gap-2 relative">
                        <input type="text" placeholder="Type here" className="input input-bordered w-full outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400 " onChange={(input_event) => { setSearch(input_event.target.value, handleSearch()) }} />
                        <button className="btn w-[50px] h-[40px] flex items-center justify-center bg-green-400 hover:bg-green-500 text-xl text-white">
                            <i className="bi bi-search"></i>
                        </button>

                        <div className="results absolute top-full left-0 w-full bg-white shadow cursor-pointer rounded mt-1 z-50">
                            {searchLoading && <div className="text-center">
                                <span className="loading loading-bars loading-lg text-green-200"></span>
                            </div>}

                            {
                                (searchResult?.data?.length <= 0 && search.replaceAll(' ', '') !== '' && !searchLoading) &&
                                <div className="text-center pops p-3 full-w bg-orange-100  bg-opacity-50">No Results found for {search}</div>
                            }

                            {
                                searchResult?.data?.map((item, index) =>
                                    <div onClick={() => handleEdit(item.id)} className="result flex items-center p-1 bg-orange-100 hover:bg-green-100  bg-opacity-50 max-h-[300px] overflow-y-scroll" key={index}>
                                        {/* <img src={(item.image !== '' && item.image !== null)? `${searchResult.image_endpoint}/${item.image}` : "/images/avatar.gif"} className="h-[45px] w-[45px] rounded-full" /> */}
                                        <div className="ml-2">
                                            <p className="pops ">{item.title}</p>
                                            <div className="flex items-center text-sm ">
                                                <i className="bi bi-geo-alt"></i>
                                                <span className=''>{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <select className="select select-bordered w-full max-w-xs col-span-2 outline-none ring-0 focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 focus:border-green-400" onChange={(change_event) => { setSearchType(change_event.target.value, handleSearch()) }}>
                        <option value='recent' selected>Recent</option>
                        <option value='older'>Older</option>
                    </select>

                </div>
                {!(typeof(data?.data) == "undefined" || data?.data?.length <= 0 || typeof(data?.data[0]) == 'undefined') &&
                    <>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Start Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            End Date
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
                                    {data?.data?.map && data?.data?.map(item =>
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap">

                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white ">
                                                <div className="text-base font w-[50px]">
                                                    <img src={`${data?.image_endpoint}/${item.image}`} className="object-cover h-[50px] w-[50px] rounded-md" />
                                                </div>
                                            </th>
                                                <td className="px-6 py-4">
                                                    {item?.fullname}
                                                </td>
                                            <td className="px-6 py-4">
                                                {formatDate(item?.start)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatDate(item?.end)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => { window.my_modal_2.showModal(); setAppointmentId(item.id)}} className="btn btn-sm border-2 bg-green-100 hover:bg-green-400 hover:text-white hover:border-green-400 border-green-400 text-green-400">
                                                  <i className="bi bi-eye" />
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <TableLoading load={(isLoading || isError || data?.status === 'error' || typeof(data.data) === 'undefined')} />
                            </table>


                        </div>
                    </>

                }

                <AppointmentModal id={appointmentId} />


                <EmptyBox load={typeof(data?.data) == 'undefined' || typeof(data?.data[0]) == 'undefined' || (data?.data?.length <= 0 && page <= 1) } link={['New Job', '/employer/job']} title="No Appointment Yet" text="Click the 'New Job' button to create a new job" />

                <Pagination pages={parseInt(typeof(data?.data) !== 'undefined' && typeof (data?.data[0]) !== 'undefined' ? data?.data[0]['page_count'] : 0)} page={page} handlePage={setPage} />
              </>
            }
        </>
    )
}


function formatDate(inputDateStr) {
    // Create a Date object from the input string
    const inputDate = new Date(inputDateStr);
  
    // Define arrays for month names and day names
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
  
    // Extract month, day, and time information
    const monthName = months[inputDate.getMonth()];
    const dayOfMonth = inputDate.getDate();
    const dayOfWeek = daysOfWeek[inputDate.getDay()];
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
  
    // Determine if it's AM or PM
    const amOrPm = hours < 12 ? "am" : "pm";
  
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;
  
    // Create the desired output string
    const outputStr = `${dayOfMonth}th ${monthName} ${dayOfWeek} ${formattedHours}:${minutes}${amOrPm}`;
  
    return outputStr;
}

export default Appointment