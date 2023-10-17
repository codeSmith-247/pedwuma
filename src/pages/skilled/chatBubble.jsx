import { timeAgo } from '../../databank';
import sanitize from 'sanitize-html';

// eslint-disable-next-line react/prop-types
const ChatBubble = ({item = {}, fullname='', image_endpoint = '', doc_endpoint = ''}) => {
    // console.log('chat_item', item);
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
        {
            item?.type == 'text' &&
            <div className={`chat-bubble ${item?.who != 'recipient'? 'chat-bubble-success' : ''}`}dangerouslySetInnerHTML={{__html: sanitize(item?.message)}}></div>
        }

        {
            item?.type == 'file' &&
            <a onClick={() => {window.open(`${doc_endpoint}${item.message}`, '_blank')}} className={`chat-bubble font-black underline ${item?.who != 'recipient'? 'chat-bubble-success' : ''}`}>
                CLICK TO VIEW FILE
            </a>
        }

        {
            item?.type == 'image' &&
            <div className={`chat-bubble ${item?.who != 'recipient'? 'chat-bubble-success' : ''}`}>
                <img src={image_endpoint + item.message} className="max-w-[270px] object-contain h-max overflow-hidden rounded-md" />
            </div>
        }


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