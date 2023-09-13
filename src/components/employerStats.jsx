import {read} from '../databank';

import Skeleton from 'react-loading-skeleton';

const EmployerStats = () => {
    const {data, isLoading, isError} = read.useEmployerTotals();

    const result = data?.data;

    const stats = [
        {
            name: "Total Jobs",
            value: result?.jobs ?? 0,
            icon: "briefcase"
        },
        {
            name: "Active Jobs",
            value: result?.active_jobs ?? 0,
            icon: "wrench-adjustable-circle"
        },
        {
            name: "Jobs This Week",
            value: result?.jobs_this_week ?? 0,
            icon: "person-workspace"
        },
        {
            name: "Jobs This Month",
            value: result?.jobs_this_month ?? 0,
            icon: "calendar2-check"
        },
        {
            name: "Total Proposals",
            value: result?.proposals ?? 0,
            icon: "envelope"
        },
        {
            name: "Accepted Proposals",
            value: result?.accepted_proposals ?? 0,
            icon: "envelope-paper"
        },
        {
            name: "Proposals This Week",
            value: result?.proposals_this_week ?? 0,
            icon: "envelope-check"
        },
        {
            name: "Proposals This Month",
            value: result?.proposals_this_month ?? 0,
            icon: "envelope-paper-heart"
        },
        
    ];

    return (
        <section className="grid-box-fit gap-4" style={{"--width": "200px"}}>
            {stats.map(item => 
                <div className="shadow-md hover:shadow-lg rounded-md p-2 grid grid-cols-10 " key={item.name}>
                    <div className="col-span-7 flex flex-col">
                        <b className="font-bold">{item.name}</b>
                        { (isLoading || isError) && 
                            <Skeleton height={40} />
                        }
                        {
                            !(isLoading || isError) &&
                            <span className="orb text-4xl">{item.value}</span>
                        }
                    </div>

                    <div className="icon col-span-3 flex items-center justify-center text-4xl">
                        <i className={`bi bi-${item.icon}`}></i>
                    </div>
                </div>
            )}
        </section>
    );
}

export default EmployerStats