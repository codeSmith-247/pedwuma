import {read} from '../databank';

import Skeleton from 'react-loading-skeleton';

const SkilledStats = () => {
    const {data, isLoading, isError} = read.useSkilledTotals();

    const result = data?.data;

    const stats = [
        {
            name: "Jobs Recieved",
            value: result?.jobs ?? 0,
            icon: "briefcase"
        },
        {
            name: "Active Jobs",
            value: result?.active_jobs ?? 0,
            icon: "wrench-adjustable-circle"
        },
        {
            name: "Total Revenue",
            value: result?.revenue ?? 0,
            icon: "cash"
        },
        {
            name: "Revenue This Month",
            value: result?.revenue_this_month ?? 0,
            icon: "coin"
        },
        {
            name: "Accepted Proposals",
            value: result?.accepted_proposals ?? 0,
            icon: "envelope-paper"
        },
        {
            name: "Total Profile Views",
            value: result?.views ?? 0,
            icon: "eye"
        },
        {
            name: "Views This Week",
            value: result?.views_this_week ?? 0,
            icon: "calendar4-week"
        },
        {
            name: "Views This Month",
            value: result?.views_this_month ?? 0,
            icon: "calendar2-check"
        },
        
    ];

    // console.log(data);

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

export default SkilledStats