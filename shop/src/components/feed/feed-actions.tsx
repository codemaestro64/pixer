import FeedButtonAlt from "./feed-button-alt"
import { PictureIcon } from "../icons/picture-icon"
import { VideoIcon } from "../icons/video-icon"
import { ChatPullFillIcon } from "../icons/chat-pull-fill-icon"
import { AttachmentIcon } from "../icons/attachment-icon"


export default function FeedActions() {
  return (
    <div className="px-[23px] md:px-[16px] py-[17.5px] bg-[#fdfdfd] dark:bg-[#262626] rounded-[18px]">
      <div className='flex items-center'>
        <ul className='flex gap-[12px] flex-wrap'>
          <li>
            <FeedButtonAlt label='Images' icon={<PictureIcon />} />
          </li>
          <li>
            <FeedButtonAlt label='Video' icon={<VideoIcon />} />
          </li>
          <li>
            <FeedButtonAlt label='Pool' icon={<ChatPullFillIcon />} />
          </li>
          <li>
            <FeedButtonAlt label='Attachment' icon={<AttachmentIcon />} />
          </li>
        </ul>
        <div className='ml-auto'>
          <button className='h-[42px] text-[12.38px] text-white px-[26.64px] bg-brand rounded-[88.46px]'>Post</button>
        </div>
      </div>
    </div>
  )
}