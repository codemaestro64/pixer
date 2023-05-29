import successIcon from '@/assets/images/post/party-popper.png';
import SuccessBg from '@/assets/images/post/sprinkles.png';
import Image from '@/components/ui/image';
import Button from '../ui/button';
import routes from '@/config/routes';
import { useRouter } from 'next/router';

export default function CreateServiceSuccess() {
  const router = useRouter();

  return (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-brand sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="relative flex aspect-[3328/1326] w-full items-center">
        <Image
          src={successIcon}
          alt="Post Success"
          layout="fill"
          className="object-contain"
        />
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src={SuccessBg}
            alt="Post Success"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center p-10 pt-0 sm:p-20 sm:pt-0">
        <p className="font-poppins text-[23px] font-semibold text-dark dark:text-light md:text-[42px]">
          Congratulations
        </p>

        <p className="w-full text-center font-poppins text-[12px] text-dark-300 dark:text-light-300 md:w-3/4 md:text-[14px]">
          You have successfully create your gig, Share your gig and start
          earning now
        </p>

        <Button
          className="mt-10 min-h-[46px] w-full rounded-[0px] bg-dark-200 font-poppins text-sm tracking-[0.2px] text-light sm:h-12"
          onClick={() => router.push(routes.service)}
          variant="text"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
