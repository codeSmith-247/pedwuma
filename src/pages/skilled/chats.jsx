import { useState, useRef } from "react";
// import { Link } from "react-router-dom";
import { read, create, decrypt, timeAgo } from '../../databank';
import { Loading } from '../../components';
import Skeleton from 'react-loading-skeleton';
import ChatNav from './chatNav';
import ChatBubble from './chatBubble';
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Chats = ({ authNavs = [] }) => {

    const navigate = useNavigate();

    const [menu, setMenu] = useState(true);

    const [chatRecipient, setChatRecipient] = useState(read.getItem('chat_person') !== null && read.getItem('chat_person') !== 'empty' ? decrypt(read.getItem('chat_person')) : null);

    const [preChats, setPreChats] = useState([]);

    const [chatBox, setChatBox] = useState({});

    const [prevChatLength, setPrevChatLength] = useState(null);
    const [firstTime, setFirstTime] = useState(true);

    const scrollChatToBottom = () => {
        if(chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            setFirstTime(false);
        }
    }

    const handleInput = (e) => {
        if (e.target.value.replaceAll(' ', '') == '') return false;
        setChatBox({ type: 'text', message: e.target.value });
    }

    const handleFileInput = (e) => {
        let input = e.target;
        let name = input.getAttribute('name');

        let type = 'file';

        if(name == 'image') type = 'image';

        let url = URL.createObjectURL(input.files[0]);

        setChatBox({ type: type, message: url});
    }

    const handleSend = (e) => {
        e.preventDefault();

        if (typeof (chatBox.type) == 'undefined') return false;

        setPreChats([...preChats, { ...chatBox }]);

        let data = new FormData(e.target);

        if(chatBox?.message?.replaceAll(' ', '') == '') return false;

        create.sendChat(data).then((response) => {
            console.log(response);

            scrollChatToBottom();
        })

        setChatBox({})

        chatRef.current.value = "";
    }

    const { data, isLoading, isError } = read.useChatRecipients();

    const chats = read.useChats(chatRecipient);

    // console.log(chats);

    const chatRef = useRef();
    const chatBoxRef = useRef();
    const imageRef = useRef();
    const fileRef = useRef();
    

    if(prevChatLength !== chats?.data?.data?.chats?.length) {
        setPreChats([]);
        setPrevChatLength(chats?.data?.data?.chats?.length);

        scrollChatToBottom();
    }



    useEffect(() => {
        scrollChatToBottom();
    }, [chatRecipient]);

    return (
        <>
            <Loading load={chats?.isLoading || chats?.isError} />
            <section className={`main-dashboard flex h-screen overflow-hidden p-1 text-neutral-800 absolute w-min right-0 top-0 ${menu ? '' : 'active'}`}>
                <div className="left bg-white border-r border-neutral-100 border-opacity-90 p-2 w-[250px]" >
                    <div onClick={() => navigate(-1)} className="logo text-lg text-gray-200 italic font-black text-center block w-full flex items-center justify-center flex-col">
                        <div className="logo font-black text-lg h-[50px] w-[50px] overflow-hidden rounded-full mx-5">
                            <img src="/images/logo.jpg" className="object-cover h-full w-full scale-150" />
                        </div>
                        PEDWUMA
                    </div>

                    <div className="nav-links py-2">
                        {(isLoading || isError) &&
                            Array.from({ length: 20 }, (value, index) => index).forEach((item) => {
                                <div className="my-2">
                                    <Skeleton height={50} key={item} />
                                </div>
                            })
                        }

                        {data &&
                            data?.data?.map(item =>
                                <button onClick={() => setChatRecipient(item?.id)} className={`nav-item flex items-center w-full ${item?.id == chatRecipient ? 'bg-green-300 text' : ''} active:bg-green-100 hover:bg-neutral-100  border-2 border-transparent active:border-green-100  p-1 py-1 my-3 rounded-md bg-opacity-50 `} key={item.name}>
                                    <div className="icon h-[40px] w-[40px] rounded-full">
                                        <img className={`rounded-full object-cover h-full w-full`} src={`${data?.image_endpoint}/${item?.image}`} />
                                    </div>
                                    <div className="pl-2 text-left">
                                        <div className="font-bold leading-none text-sm">{item?.name}</div>
                                        <div className="text-xs pb-1 ">
                                            {item?.message}
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            {timeAgo(item?.created_at)}
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
                    <ChatNav menu={menu} setMenu={setMenu} authNavs={authNavs} recipient={chatRecipient} />

                    {
                        (chatRecipient === null) &&

                        <main className="flex flex-col justify-center items-center h-[90vh] text-gray-400">
                            <div className="icon text-9xl ">
                                <i className="bi bi-briefcase"></i>
                            </div>
                            <span className="font-bold my-1 italic">Transact new jobs to begin new chats</span>
                        </main>
                    }

                    <main className="p-5 flex flex-col justify-end overflow-y-scroll h-[90vh]">
                        {
                            (chats?.data && chats?.data?.data?.chats?.length <= 0 && preChats.length <= 0) &&

                            <div className="h-[80vh] flex items-center justify-center flex-col text-gray-400">
                                <div className="icon text-9xl ">
                                    <i className="bi bi-chat-text"></i>
                                </div>
                                <span className="font-bold my-1 italic">Send a message using the chat box bellow</span>
                            </div>
                        }


                        <div ref={chatBoxRef} className="chats overflow-y-scroll">
                        {
                            (chats?.data && chats?.data?.data?.chats?.length > 0) &&

                            chats?.data?.data?.chats?.map((item, index) =>
                                <ChatBubble item={item} key={index} fullname={chats?.data?.data?.info?.fullname} image_endpoint={`${chats?.data?.image_endpoint}/`} doc_endpoint={`${chats?.data?.docs_endpoint}/`} />
                            )
                                

                        }

                        {
                            (chats?.data && preChats.length > 0) &&

                            preChats?.map((item, index) =>
                                <ChatBubble item={item} key={index} fullname={chats?.data?.data?.info?.fullname} />
                            )
                                 
                        }

                        </div>
                        <form onSubmit={handleSend} className="chat-input flex items-center gap-1 relative">
                                {
                                    chatBox?.type == 'file' &&
                                    <div className="absolute w-full h-max -top-[150%] bg-gray-100 rounded-md">
                                        <div onClick={() => {window.open(`${chatBox.message}`, '_blank')}}  className="p-3 m-2 bg-gray-200 rounded text-center underline uppercase font-black">
                                            Click to preview file
                                        </div>
                                    </div>
                                }

                                {
                                    chatBox?.type == 'image' &&
                                    <div className="absolute w-max max-w-full h-max -top-[220%] left-0 bg-gray-100 rounded-md">
                                        <div onClick={() => {window.open(`${chatBox.message}`, '_blank')}}  className="p-3 m-2 bg-gray-200 rounded text-center underline uppercase font-black">
                                            <img src={chatBox.message} className="h-[70px] w-[70px] rounded-md object-cover"></img>
                                        </div>
                                    </div>
                                }
                            {/* <div className="imoji h-[35px] w-[35px] rounded-full bg-neutral-800 text-yellow-300 flex items-center justify-center">
                                <i className="bi bi-emoji-smile"></i>
                            </div> */}
                            <Dropdown

                                inline
                                label={<div className="share h-[35px] w-[35px] rounded-full bg-blue-400 text-white flex items-center justify-center">
                                            <i className="bi bi-share"></i>
                                        </div>}
                            >
                                <div onClick={() => {if(fileRef.current) fileRef.current.click();}}>
                                    <Dropdown.Item>
                                        Share File
                                    </Dropdown.Item>
                                </div>
                                <Dropdown.Divider />
                                <div onClick={() => {if(imageRef.current) imageRef.current.click();}}>
                                    <Dropdown.Item>
                                        Share Image
                                    </Dropdown.Item>
                                </div>
                            </Dropdown>

                            <input ref={chatRef} name="message" onInput={handleInput} type="text" autoComplete="off" className="p-3 px-5 bg-gray-200 rounded-xl border-0 hover:border-0 active:border-0 focus:border-0 hover:outline-none active:outline-none focus:outline-none hover:ring-0 focus:ring-0 active:ring-0" style={{ width: "calc(100% - 105px)" }} />
                            <input type="hidden" name="type" value={chatBox?.type} />
                            <input type="hidden" name="recipient" value={chatRecipient} />
                            <input ref= {fileRef} onInput={handleFileInput} type="file" name="file" className="p-0 m-0 h-0 w-0 overflow-hidden opacity-0" />
                            <input ref={imageRef} onInput={handleFileInput} type="file" name="image" className="p-0 m-0 h-0 w-0 overflow-hidden opacity-0" />
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