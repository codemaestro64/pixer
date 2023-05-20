import { useTranslation } from "next-i18next"
import FollowButton  from "../follow/follow-button";


export default function AuthorFollowButton ({ shop_id }: { shop_id: string }) {
  const { t } = useTranslation('common');
  const classStr = "text-[11px] 2xl:text-[12px] h-[43.91px] 2xl:h-[48px] px-[46.07px] text-white flex items-center bg-brand rounded-[73.17px]"

  return (
    <FollowButton shop_id={shop_id} additionalClasses={classStr} /> 
  )
}