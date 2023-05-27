import Image from '@/components/ui/image';
import Avatar from 'react-avatar';

export default function ProfileLogo({
  name,
  logo,
}: {
  name: string;
  logo: any;
}) {
  return (
    <div className="relative z-[3] h-[112.42px] xl:h-[197px] w-[112.42px] xl:w-[197px] mt-[-81.42px] xl:mt-[-96px]">
      <div className="absolute inset-0 bg-brand rounded-[12.21px] xl:rounded-[21.39px]"></div>
      <div className="h-[113.95px] xl:h-[200px] w-[113.95px] xl:w-[200px] bottom-[3.05px] xl:bottom-[4px] right-[3.05px] xl:right-[4px] absolute rounded-[12.21px] xl:rounded-[20.36px] overflow-hidden">
        <Avatar size="100%" name={name} textSizeRatio={2} src={logo} />
      </div>
    </div>
  );
}
