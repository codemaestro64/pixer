import { useTranslation } from "next-i18next"

export default function FollowButton() {
  const { t } = useTranslation('common');

  return (
    <button className="h-[43.91px] px-[46.07px] text-white flex items-center bg-brand rounded-[73.17px]">
      {t('text-follow')}
    </button>
  )
}