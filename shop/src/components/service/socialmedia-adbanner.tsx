import { String } from 'lodash';

export default function SocialmediaAdbanner({
  categories,
  sub_categories,
  title,
}: {
  categories: string;
  sub_categories: string;
  title: string;
}) {
  return (
    <div className="text-[10.06px] xl:text-[16px] px-[6.29px] xl:px-[10px] h-[39px] xl:h-[62px] flex items-center text-[#8A8A8A] font-medium font-poppins">
      <div>{categories} &gt;&nbsp;</div>
      <div>{sub_categories} &gt;&nbsp;</div>
      <div className="text-brand">{title}</div>
    </div>
  );
}
