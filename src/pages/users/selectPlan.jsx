import { Link } from "react-router-dom"
import { ImageBG } from "../../components/"

const plans = [
    {
        name: "Basic",
        amount: 123,
        features: [0,0,0,0,0]
    },
    {
        name: "Recommended",
        amount: 123,
        features: [0,0,0,0,0]
    },
    {
        name: "Pro",
        amount: 123,
        features: [0,0,0,0,0]
    },
];

const SelectPlan = () => {
  return (
    <ImageBG  classname="bg-orange-100 bg-opacity-30 text-slate-800">
        
        <div className="backdrop-blur-3xl min-h-screen py-10">

            <h1 className="capitalize text-3xl font-bold text-slate-900 max-[835px]:text-xl text-center">choose the recomended plan</h1>
            {/* <p className="text-sm font-bold pops text-center max-w-[350px] mx-auto my-5">Just kidding!😂 select the plan that wors for you!</p> */}

            <div className="cards flex items-center justify-center flex-wrap gap-5 mt-7">
                {plans.map((item, index) => 
                    <div className={`card w-[320px] max-[360px]:w-[90vw] min-h-[420px] rounded-md shadow-xl p-5 transform hover:-translate-y-2 ${ index == 1? "bg-neutral-800 text-white " : "bg-white scale-95"}`} key={item.name}>
                        <div className={`name text-sm font-bold whitespace-nowrap rounded-md p-1 px-4 w-min ${ index == 1? "bg-neutral-900" : "bg-neutral-200 "}`}>{item.name}</div>
                        <div className="font-bold my-5 flex text-5xl">
                            <span className="orb">Ghc</span><span className=" orb">{index}.00</span>
                        </div>
                        <span className="text-sm w-full border"></span>

                        <div className="feature-list my-4">
                            {item.features.map(item => 
                            
                                <div className="feature pops my-2 flex items-center ]" key={item}>
                                    <i className="bi bi-check2-circle text-green-500 text-xl"></i>
                                    <span className="px-1  pops text-sm">The feature is placed here</span>
                                </div>
                            )}
                        </div>

                        <Link to="/auth" className="btn bg-green-400 hover:bg-green-500 text-white">Choose Plan</Link>

                    </div>
                )}
                
            </div>

        </div>

    </ImageBG>
  )
}

export default SelectPlan