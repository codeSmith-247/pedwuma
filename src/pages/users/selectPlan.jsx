import {useState} from 'react';
import Skeleton from "react-loading-skeleton";
import { ImageBG, Loading } from "../../components/"
import { read } from "../../databank";
import {PaystackButton} from 'react-paystack';
import Swal from 'sweetalert2';


// eslint-disable-next-line react/prop-types
const SelectPlan = ({email, name, phone, setPlan = (plan) => {console.log(plan)}}) => {

    const {data, isLoading, isError} = read.usePlans();
    const [loadingState, setLoadingState] = useState(false);

    let plans = [];

    if(data){
        plans = data.data;
        // console.log(plans);
    }


    const handleMyPayment = (reference, plan) => {
        // console.log('reference: $d', reference);

        if(reference.status !== 'success') {
            Swal.fire({
                icon: 'error',
                title: 'Payment Confirmation',
                text: 'System is unable to confirm your payment, if payment was made please contact pedwuma for assistance',
            });

            return false;
        }

        setLoadingState(true);

        read.confirmPayment(reference.reference, name, email).then((response) => {
            setLoadingState(false);
            // console.log(response.data);
            
            if(response.data.status !== 'success') {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Confirmation',
                    text: 'System is unable to confirm your payment, if payment was made please contact pedwuma for assistance',
                });
            }
            else {

                setPlan(plan);
            }
        })
    }

    const paystackButtonProps = {

        email: email,

        currency: 'GHS',

        metadata: {

        name: name,

        phone: phone,

        },

        publicKey: 'pk_test_3e5e2bf632f13d0d454ae88da3761e4246b180bb',

        text: "Choose Plan",

    }

    return (
        <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
            
            <div className="backdrop-blur-3xl min-h-screen py-10">

                <Loading load={loadingState}/>

                <h1 className="capitalize text-3xl font-bold text-slate-900 max-[835px]:text-xl text-center">choose a plan</h1>
                {/* <p className="text-sm font-bold pops text-center max-w-[350px] mx-auto my-5">Just kidding!😂 select the plan that wors for you!</p> */}

                <div className="cards flex items-center justify-center flex-wrap gap-5 mt-7">
                    {
                        (isLoading || isError || plans.length <= 0) &&
                        [0,0,0].map((item, index) =>
                            <Skeleton height={400} width={300} key={index} className="rounded shadow-md"/>
                        )
                    }
                    {plans.map((item, index) => 
                        <div className={`card w-[320px] max-[360px]:w-[90vw] min-h-[420px] rounded-md shadow-xl p-5 transform hover:-translate-y-2 ${ index == 1? "bg-neutral-800 text-white " : "bg-white scale-95"}`} key={item.name}>
                            <div className={`name text-sm font-bold whitespace-nowrap rounded-md p-1 px-4 w-min ${ index == 1? "bg-neutral-900" : "bg-neutral-200 "}`}>{item.name}</div>
                            <div className="font-bold my-5 flex text-5xl">
                                {item.price > 0 &&
                                <>
                                    <span className="orb">Ghc</span><span className=" orb">{item.price}</span>
                                </>}
                                {item.price <= 0 && <span className=" orb">Free</span>}
                            </div>
                            <span className="text-sm w-full border"></span>

                            <div className="feature-list my-4">
                                {item.features.map((item, index) => 
                                
                                    <div className="feature pops my-2 flex items-center ]" key={index}>
                                        <i className="bi bi-check2-circle text-green-500 text-xl"></i>
                                        <span className="px-1  pops text-sm">{item.feature}</span>
                                    </div>
                                )}
                            </div>

                            {
                                item.name == 'Basic' &&
                                    <button onClick={() => setPlan(item.id)} className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white">Choose Plan</button>
                            }

                            {
                                item.name != 'Basic' &&
                                <PaystackButton {...paystackButtonProps} onSuccess={(ref) => handleMyPayment(ref, item.id)} amount={Math.ceil(item.price) * 100} className="btn flex items-center justify-center bg-green-400 hover:bg-green-500 text-white"/>
                            }

                        </div>
                    )}
                    
                </div>

            </div>

        </ImageBG>
    );
}

export default SelectPlan