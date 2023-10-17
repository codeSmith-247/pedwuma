import { useState } from 'react';
import { create } from '/src/databank';
import { Loading } from '/src/components';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const Footer = () => {

    const [loading, setLoading] = useState(false);

    const sendMessage = (e) => {

        e.preventDefault();

        setLoading(true);

        let data = new FormData(e.target);

        create.sendMessage(data).then((response) => {
            let data = response.data;

            console.log(data);

            setLoading(false);

            Swal.fire({
                icon: data?.status,
                title: data?.title,
                text: data?.message,
            });

        });


    }

    return (
        <footer id="contact" className="bg-neutral-900  text-white p-10 flex justify-around items-center flex-wrap-reverse">
            <div className="left">
                <div className="logo font-black text-lg h-[150px] w-[150px] overflow-hidden rounded-full mx-5">
                    <img src="/images/logo.jpg" className="object-cover h-full w-full scale-[160%]" />
                </div>
                <div className="text-center font-black text-3xl">PEDWUMA</div>

                {/* <div className="icons flex items-center gap-5 text-2xl backdrop-blur-3xl shadow bg-neutral-950 bg-opacity-20 w-max p-3 rounded-md">
                    {[0, 0, 0, 0].map((item, index) => 
                        <div className="icon flex items-center justify-center h-[40px] w-[40px] rounded-md bg-red-500" key={index}>
                            <i className="bi bi-google"></i>
                        </div>
                    )}
                </div> */}
            </div>

            <div className="flex justify-center whitespace-nowrap">
                <div className="left-middle flex flex-col">
                    {[["Home", '/'], ["Jobs", '/jobs'], ["Skills", '/skills'], ["About Us", '/about']].map( (item, index) => 
                        <Link to={item[1]} className="link-item p-2 my-2 hover:bg-neutral-950 rounded-md inline" key={index}>
                            <i className="bi bi-link"></i>
                            <span className="mx-2">{item[0]}</span>
                        </Link>
                    )}
                </div>

                <div className="right-middle flex flex-col">
                    {[["Log In", '/login'], ["Sign Up", '/signup'], ["Privacy Policy", '/about'], ["Terms & Conditions", '/about']].map( (item, index) => 
                        <Link to={item[1]} className="link-item p-2 my-2 hover:bg-neutral-950 rounded-md inline" key={index}>
                            <i className="bi bi-link"></i>
                            <span className="mx-2">{item[0]}</span>
                        </Link>
                    )}
                </div>
            </div>


            <form onSubmit={sendMessage} className="min-w-[300px] max-w-[400px] mb-10 ">
                <Loading load={loading} />
                <h3 className="font-black text-2xl">Send Us A Message</h3>

                <input className="p-2 h-[50px] outline-none ring-0 w-full my-2 rounded-md bg-neutral-900" required name="email" type="text" placeholder="Type your email here"/>
                <input className="p-2 h-[50px] outline-none ring-0 w-full my-2 rounded-md bg-neutral-900" required name="number" type="tel" placeholder="Type your phone number here"/>
                <textarea className="p-2 h-[170px] outline-none ring-0 w-full my-2 rounded-md bg-neutral-900" required name="message" type="text" placeholder="Type your message here"></textarea>
                <button className="btn flex items-center justify-center hover:bg-green-500 bg-green-400 p-2 font-bold rounded-md w-full">Send Message</button>
            </form>
        </footer>
    )
}

export default Footer