import Image from '@/components/ui/image';

export default function ProfileBackground({ background }: { background: any }) {
  return (
    <div className="h-[134px] sm:h-[256px] relative">
      <Image
        src={background}
        alt="Author banner"
        layout="fill"
        objectFit="cover"
        className="z-[1]"
      />
      <div className="absolute inset-0 z-[2] bg-[rgba(6,66,44,0.69)]"></div>
    </div>
  );
}
