import { timeAgo } from '../../databank';


// eslint-disable-next-line react/prop-types
const ChatBubble = ({item = {}, fullname=''}) => {
  return (
    <div className={` chat ${item?.who != 'recipient'? 'chat-end' : 'chat-start'} `}>
        <div className="chat-header">
            { 
                (item?.who != 'recipient') && <span>You</span>
            }

            { 
                (item?.who == 'recipient') &&  <span>{fullname}</span>
            }
            <time className="text-xs opacity-50">: {timeAgo(item?.updated_at)}</time>
        </div>
        <div className="chat-bubble">{item?.message}</div>
        <div className="chat-footer opacity-50">
            {
                (typeof(item?.updated_at) != 'undefined') && 'Delivered'
            }

            {
                (typeof(item?.updated_at) == 'undefined') && 'sending...'
            }
        </div>
    </div>
  )
}

export default ChatBubble