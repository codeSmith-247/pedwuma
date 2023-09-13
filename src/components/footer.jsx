
const Footer = () => {
  return (
    <footer id="contact" className="bg-neutral-900  text-white p-10 flex justify-around items-center flex-wrap-reverse">
        <div className="left">
            <div className="logo text-6xl font-bold">PE ADWUMA</div>
            <div className="icons flex items-center gap-5 text-2xl backdrop-blur-3xl shadow bg-neutral-950 bg-opacity-20 w-max p-3 rounded-md">
                {[0, 0, 0, 0].map((item, index) => 
                    <div className="icon flex items-center justify-center h-[40px] w-[40px] rounded-md bg-red-500" key={index}>
                        <i className="bi bi-google"></i>
                    </div>
                )}
            </div>
        </div>

        <div className="flex justify-center whitespace-nowrap">
            <div className="left-middle">
                {["Home", "Jobs", "Skills", "About Us"].map( (item, index) => 
                    <div className="link-item p-2 my-2 hover:bg-neutral-950 rounded-md" key={index}>
                        <i className="bi bi-link"></i>
                        <span className="mx-2">{item}</span>
                    </div>
                )}
            </div>

            <div className="right-middle">
                {["Log In", "Sign Up", "Privacy Policy", "Terms & Conditions"].map( item => 
                    <div className="link-item p-2 my-2 hover:bg-neutral-950 rounded-md" key={item}>
                        <i className="bi bi-link"></i>
                        <span className="mx-2">{item}</span>
                    </div>
                )}
            </div>
        </div>


        <form className="min-w-[300px] max-w-[400px] mb-10 ">
            <h3 className="font-black text-2xl">Send Us A Message</h3>

            <input className="p-3 h-[50px] outline-none ring-0 w-full my-3 rounded-md bg-neutral-950" name="email" type="text" placeholder="Type your email here"/>
            <textarea className="p-3 h-[170px] outline-none ring-0 w-full my-3 rounded-md bg-neutral-950" name="email" type="text" placeholder="Type your message here"></textarea>
            <button className="btn flex items-center justify-center hover:bg-green-500 bg-green-400 p-2 font-bold rounded-md w-full">View Skills</button>

        </form>
    </footer>
  )
}

export default Footer