import FeedButton from "./feed-button"
import { CompassIcon } from "../icons/compass-icon"
import { PictureIcon } from "../icons/picture-icon"
import { SearchIcon } from "../icons/search-icon"

export default function FeedMenu() {
  return (
    <ul className="grid grid-cols-3 gap-3">
      <li>
        <FeedButton label="Explore" icon={<CompassIcon className="h-[18px] w-[18px]" />} isActive />
      </li>
      <li>
        <FeedButton label="Photos" icon={<PictureIcon className="h-[18px] w-[18px] fill-current" />} />
      </li>
      <li>
        <div className="relative">
          <input type="text" placeholder="Search" className="w-full font-poppins font-semibold text-[12.06px] py-[11.64px] pl-[54.84px] pr-[22.84px] rounded-[86.12px] bg-[#f8f8f8] dark:bg-dark-100 border border-[#D5D5D5] dark:border-[#434343] focus:dark:bg-[rgba(3,101,82,0.16)] focus:border-brand h-[41.34px] placeholder:text-dark-850 placeholder:dark:text-[#434343]" />
          <span className="absolute top-1/2 left-[28.84px] -translate-x-1/2 -translate-y-1/2 text-dark-850 focus: dark:text-[#434343]">
            <SearchIcon className="h-[18px] w-[18px]" />
          </span>
        </div>
      </li>
    </ul>
  )
}