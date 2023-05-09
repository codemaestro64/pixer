import FeedButtonAlt from "./feed-button-alt"
import { PictureIcon } from "../icons/picture-icon"
import { VideoIcon } from "../icons/video-icon"
import { ChatPullFillIcon } from "../icons/chat-pull-fill-icon"
import { AttachmentIcon } from "../icons/attachment-icon"


export default function FeedActions() {
  return (
    <div className="px-[23px] py-[17.5px] bg-[#fdfdfd] dark:bg-[#262626] rounded-[18px]">
      <div className='flex items-center'>
        <ul className='flex gap-[12px] flex-wrap'>
          <li>
            <FeedButtonAlt icon={<PictureIcon />} />
          </li>
          <li>
            <FeedButtonAlt icon={<VideoIcon />} />
          </li>
          <li>
            <FeedButtonAlt icon={<ChatPullFillIcon />} />
          </li>
          <li>
            <FeedButtonAlt icon={<AttachmentIcon />} />
          </li>
        </ul>
        <div className='ml-auto'>
          <button className='h-[42px] text-[12.38px] text-white py-[11.73] px-[26.64px] bg-brand rounded-[88.46px]'>Post</button>
        </div>
      </div>
    </div>
  )
}