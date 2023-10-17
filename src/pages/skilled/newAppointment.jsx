import { useState, useEffect } from 'react';
import { create } from '../../databank';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';

import * as React from 'react';




const NewAppointment = ({id}) => {

    const [ loading, setLoading ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState('');

    const [ days, setDays ] = useState(30);

    const queryClient = useQueryClient();

    const createPortfolio = (e) => {
        e.preventDefault();

        setLoading(true);

        let data = new FormData(e.target);


        create.createAppointment(data).then( response => {
            let data = response.data;

            console.log(data);

            window.my_modal_3.close();

            Swal.fire({
                icon: data?.status,
                title: data?.title,
                text: data?.message,
            });

            if(data?.status == 'success'){

                e.target.reset();

                queryClient.invalidateQueries();
            } 

            setLoading(false);
        })

    
    }

    const getDays = (e) => {
        let month = e.target.value;

        console.log(month);

        let months_30 = ['september', 'april', 'june', 'november'];


        if(month == 'febuary') {
            isLeapYear() ? setDays(29) : setDays(28);
        }
        else if (months_30.indexOf(month) < 0) {
            setDays(31);
        }
        else
        setDays(30);
    }

    const months = [
        'january', 
        'febuary',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
    ];

    const time = [
        '12:30',
        '12:00',
        '11:30',
        '11:00',
        '10:30',
        '10:00',
        '9:30',
        '9:00',
        '8:30',
        '8:00',
        '7:30',
        '7:00',
        '6:30',
        '6:00',
        '5:30',
        '5:00',
        '4:30',
        '3:30',
        '3:00',
        '2:30',
        '2:00',
        '1:30',
        '1:00',
    ];

    return (
        <dialog id="my_modal_3" className="modal">
            <Loading load={loading} />
            <form onSubmit={createPortfolio}  method="dialog" className="modal-box">
                <input type="hidden" name="id" value={id} />
                <button type='button' className="btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>window.my_modal_3.close()}>✕</button>
                <h3 className="font-bold text-xl mb-1">Appointment Information</h3>

                <div className="form-control my-3">
                    <label htmlFor="title" className="font-bold text-sm mb-1">Title</label>
                    <input type="text" name="title" className="pops  rounded-md border border-neutral-300  capitalize" placeholder="A short title for the work you did" />
                </div>


                <label htmlFor="title" className="font-bold text-sm mb-1">Start Date</label>
                <div className="flex items-center flex-wrap gap-1">

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Months</label>
                        <div className="flex">
                            <select onChange={getDays} name="start_month" className="capitalize rounded-md w-full select select-bordered w-full">
                                {months.map(item => 
                                    <option value={item} className="capitalize">{item}</option>    
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Days</label>
                        <div className="flex">
                            <select name="start_day" className="capitalize rounded-md w-full select select-bordered w-full">
                                {Array.from({length: days}, (item, index) => 
                                    <option key={index} value={addOrdinalSuffix(index + 1)} className="capitalize">{addOrdinalSuffix(index + 1)}</option>    
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Time</label>
                        <div className="flex">
                            <select onChange={getDays} name="start_time" className="capitalize rounded-md w-full select select-bordered w-full">
                                {time.map(item => 
                                    <option value={item} className="capitalize">{item}</option>    
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Am/Pm</label>
                        <div className="flex">
                            <select onChange={getDays} name="start_am" className="capitalize rounded-md w-full select select-bordered w-full">
                                <option value={'am'} className="capitalize">{'Am'}</option>    
                                <option value={'pm'} className="capitalize">{'Pm'}</option>    
                            </select>
                        </div>
                    </div>
                </div>

                <label htmlFor="title" className="font-bold text-sm mb-1">End Date</label>
                <div className="flex items-center flex-wrap gap-1">

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Months</label>
                        <div className="flex">
                            <select onChange={getDays} name="end_month" className="capitalize rounded-md w-full select select-bordered w-full">
                                {months.map(item => 
                                    <option value={item} className="capitalize">{item}</option>    
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Days</label>
                        <div className="flex">
                            <select name="end_day" className="capitalize rounded-md w-full select select-bordered w-full">
                                {Array.from({length: days}, (item, index) => 
                                    <option key={index} value={addOrdinalSuffix(index + 1)} className="capitalize">{addOrdinalSuffix(index + 1)}</option>    
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Time</label>
                        <div className="flex">
                            <select onChange={getDays} name="end_time" className="capitalize rounded-md w-full select select-bordered w-full">
                                {time.map(item => 
                                    <option value={item} className="capitalize">{item}</option>    
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="form-control my-3 flex-grow">
                        <label htmlFor="duration" className="font-bold text-sm mb-1 text-gray-400 text-xs">Am/Pm</label>
                        <div className="flex">
                            <select onChange={getDays} name="end_am" className="capitalize rounded-md w-full select select-bordered w-full">
                                <option value={'am'} className="capitalize">{'Am'}</option>    
                                <option value={'pm'} className="capitalize">{'Pm'}</option>    
                            </select>
                        </div>
                    </div>
                </div>


                <div className="form-control my-3">
                    <label htmlFor="description" className="font-bold text-sm mb-1">Description</label>
                    <textarea name="description" placeholder="A breif description about the work you did" className="pops  rounded-md border border-neutral-300 min-h-[90px]"></textarea>
                </div>

                <button className="btn bg-green-400 hover:bg-green-500 text-white w-full">Create Appointment</button>

            </form>

        </dialog>
    );
}

function isLeapYear() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Leap years are divisible by 4
    if (year % 4 !== 0) {
      return false;
    }
  
    // If a year is divisible by 4 and not divisible by 100, it's a leap year
    if (year % 100 !== 0) {
      return true;
    }
  
    // If a year is divisible by 100 and also divisible by 400, it's a leap year
    if (year % 400 === 0) {
      return true;
    }
  
    // If a year is divisible by 100 but not divisible by 400, it's not a leap year
    return false;
}

function addOrdinalSuffix(number) {
    if (typeof number !== 'number' || isNaN(number)) {
      return 'Invalid Input';
    }
  
    const lastDigit = number % 10;
    const secondLastDigit = Math.floor((number % 100) / 10);
  
    if (secondLastDigit === 1) {
      return number + 'th';
    } else {
      switch (lastDigit) {
        case 1:
          return number + 'st';
        case 2:
          return number + 'nd';
        case 3:
          return number + 'rd';
        default:
          return number + 'th';
      }
    }
}


export default NewAppointment;