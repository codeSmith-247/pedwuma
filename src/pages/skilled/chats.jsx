import { useState } from "react";
// import { Link } from "react-router-dom";
import { read, create } from '../../databank';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import ChatNav from './chatNav';
import ChatBubble from './chatBubble';

// eslint-disable-next-line react/prop-types
const Chats = ({authNavs = []}) => {
    const [menu, setMenu] = useState(true);

    const [chatRecipient, setChatRecipient] = useState(null)

    const [preChats, setPreChats] = useState([]);

    const [chatBox, setChatBox] = useState({});

    const handleInput = (e) => {
        if(e.target.value.replaceAll(' ', '') == '' ) return false;
        setChatBox({type: 'text', message: e.target.value});
    }

    const handleSend = (e) => {
        e.preventDefault();

        if(typeof(chatBox.type) == 'undefined') return false;

        setPreChats([...preChats, {...chatBox}]);

        let data = new FormData(e.target);

        create.sendChat(data);
        
        setChatBox({})
    }

    const {data , isLoading, isError} = read.useChatRecipients();
    
    if(data?.status === 'error'){
        Swal.fire({
            icon: data?.status,
            title: data?.title,
            text: data?.message,
        }).then(() => location.href = '/login');
    }

    const chats = read.useChats(chatRecipient);


    console.log(chats);

    return (
        <>
            <section className={`main-dashboard flex h-screen overflow-hidden p-1 text-neutral-800 absolute w-min right-0 top-0 ${menu ? '' : 'active'}`}>
                <div className="left bg-white border-r border-neutral-100 border-opacity-90 p-2 w-[250px]" >
                    <div className="logo text-xl border-b pb-5 font-black text-center">PEADWUMA</div>

                    <div className="nav-links py-2">
                        { (isLoading || isError) &&
                            Array.from({length: 20}, (value, index) => index).forEach((item) => {
                                <div className="my-2">
                                    <Skeleton height={50} key={item} />
                                </div>
                            })
                        }

                        { data &&
                            data?.data?.map(item => 
                                <button onClick={() => setChatRecipient(item.id)} className={`nav-item flex items-center w-full ${item.id == chatRecipient? 'bg-green-300 text' : ''} active:bg-green-100 hover:bg-neutral-100  border-2 border-transparent active:border-green-100  p-1 py-1 my-3 rounded-md bg-opacity-50 `} key={item.name}>
                                    <div className="icon h-[40px] w-[40px] rounded-full">
                                        <img className={`rounded-full object-cover h-full w-full`} src={`${data?.image_endpoint}/${item.image}`} />
                                    </div>
                                    <div className="pl-2 text-left">
                                        <div className="font-bold leading-none text-sm">{item.name}</div>
                                        <div className="text-xs pb-1 ">
                                            This is the last message sent...
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            03:45pm
                                        </div>
                                    </div>
                                </button>
                            )
                        }

                        {
                            (data?.data?.length === 0) &&

                            <div className="h-[80vh] flex flex-col items-center justify-center text-gray-400 ">
                                    <div className="icon text-6xl mb-2">
                                        <i className="bi bi-chat-text"></i>
                                    </div>
                                    <span className="font-bold ">Pedwuma Chat</span>
                            </div>
                        }
                    </div>
                </div>
                <div className={`right-dashboard  p-2 ${menu ? '' : 'active'}`}>
                    <ChatNav menu={menu} setMenu={setMenu} authNavs={authNavs}  />

                    {
                        (chatRecipient === null ) &&

                        <main className="flex flex-col justify-center items-center h-[90vh] text-gray-400">
                            <div className="icon text-9xl ">
                                <i className="bi bi-briefcase"></i>
                            </div>
                            <span className="font-bold my-1 italic">Transact new jobs to begin new chats</span>
                        </main>
                    }

                    <main className="p-5 flex flex-col justify-end overflow-y-scroll h-[90vh]">
                        {
                            (chats?.data && chats?.data?.data?.chats?.length <= 0 && preChats.length <= 0)  &&

                            <div className="h-[80vh] flex items-center justify-center flex-col text-gray-400">
                                <div className="icon text-9xl ">
                                    <i className="bi bi-chat-text"></i>
                                </div>
                                <span className="font-bold my-1 italic">Send a message using the chat box bellow</span>
                            </div>
                        }
                        {
                            (chats?.data &&  chats?.data?.data?.chats?.length > 0 ) &&

                            <div className="chats">
                                {
                                    chats?.data?.data?.chats?.map((item, index) => 
                                        <ChatBubble item={item} key={index} fullname={chats?.data?.data?.info?.fullname}/>
                                    )
                                }
                            </div>

                        }
                        {
                            (chats?.data && preChats.length > 0) &&

                            <div className="chats">
                                {
                                    preChats?.map((item, index) => 
                                        <ChatBubble item={item} key={index} fullname={chats?.data?.data?.info?.fullname}/>
                                    )
                                }
                            </div>

                        }
                        <form onSubmit={handleSend} className="chat-input flex items-center gap-1">
                            <div className="imoji h-[35px] w-[35px] rounded-full bg-neutral-800 text-yellow-300 flex items-center justify-center">
                                <i className="bi bi-emoji-smile"></i>
                            </div>
                            <div className="share h-[35px] w-[35px] rounded-full bg-blue-400 text-white flex items-center justify-center">
                                <i className="bi bi-share"></i>
                            </div>

                            <input name="message" onInput={handleInput} type="text" className="p-3 px-5 bg-gray-200 rounded-xl border-0 hover:border-0 active:border-0 focus:border-0 hover:outline-none active:outline-none focus:outline-none hover:ring-0 focus:ring-0 active:ring-0" style={{width: "calc(100% - 105px)"}}/>
                            <input type="hidden" name="type" value={chatBox?.type} />
                            <input type="hidden" name="recipient" value={chatRecipient} />
                            <button className="share h-[35px] w-[35px] rounded-full bg-green-400 text-white flex items-center justify-center">
                                <i className="bi bi-send"></i>
                            </button>
                        </form>
                    </main>
                </div>
            </section>
        </>
    );
}

export default Chats;