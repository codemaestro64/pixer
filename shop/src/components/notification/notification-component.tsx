import React from 'react';
import Image from '@/components/ui/image';
import boltImage from '@/assets/images/notification/bolt.png';
import tradeSuccessImage from '@/assets/images/notification/trade-success.png';
import { VolumeMuteIcon } from '../icons/volume-mute-icon';
import { DetailsIcon } from '../icons/details-icon';

interface NotificationNewPublishProps {
  notification: {
    variant: 'new_publish';
    author: string;
    image: StaticImageData;
    time: string;
  }
}

interface NotificationPostLikeProps {
  notification: {
    variant: 'post_like';
    author: string;
    image: StaticImageData;
    time: string;
  }
}

interface NotificationTradeSuccessProps {
  notification: {
    variant: 'trade_success';
    authors: {
      author: string;
      image: StaticImageData;
    }[];
    time: string;
  }
}

interface NotificationNewUpdateProps {
  notification: {
    variant: 'new_update';
    message: string;
    time: string;
  }
}

function NotificationMessage({ message, time, variant }: { message: string, time: string, variant: string }) {
  return (
    <div>
      <div className={`text-[18.45px] font-poppins font-semibold overflow-hidden w-full truncate-text-line-two ${
        variant === 'new_update' ? 'text-[#FEFEFE]' : 'text-dark-300 dark:text-[#EEEEEE]'
      }`}>
        { message }
      </div>
      <div className={`text-[12px] font-poppins font-normal ${
        variant === 'new_update' ? 'text-[#FEFEFE]' : 'text-[#878787]'
      }`}>
        { time }
      </div>
    </div>
  )
}

function NotificationButton({ variant = 'default', icon }: { variant: string | 'default' | 'new_update', icon: React.ReactElement }) {
  return (
    <button>
      { React.cloneElement(icon, {
        className: `w-[24px] h-[24px] ${
          variant === 'new_update' ? 'text-[#FEFEFE80]' : 'text-[#D1D1D1] dark:text-[#545454]'
        }`
      }) }
    </button>
  )
}

function NotificationWrapper({ variant = 'default', children }: {
  variant?: string | 'default' | 'new_update',
  children: React.ReactElement,
}) {
  return (
    <div className={`px-[10px] sm:px-[20px] 2xl:px-[30px] py-[10px] rounded-[10px] min-h-[80px] flex items-center ${
      variant === 'new_update' ? 'bg-[linear-gradient(150.18deg,#00997B_2.71%,#24B47E_96.92%)]' : 'bg-[#F1F1F1] dark:bg-[#292929]'
    }`}>
      <div className='flex items-center space-x-[16px]'>
        { children }
      </div>
      <div className='hidden sm:flex items-center ml-auto space-x-[35px] min-w-[83px]'>
        <NotificationButton variant={variant} icon={<VolumeMuteIcon />} />
        <NotificationButton variant={variant} icon={<DetailsIcon />} />
      </div>
    </div>
  )
}

function NotificationNewPublish({ notification }: NotificationNewPublishProps) {
  const { author, image, time, variant } = notification;
  const message = `New File published by ${author}`;

  return (
    <NotificationWrapper variant={variant}>
      <>
        <div className='w-[32px] min-w-[32px] h-[32px] min-h-[32px] overflow-hidden rounded-full relative'>
          <Image src={image} alt={author} layout='fill' objectFit='cover' />
        </div>
        <NotificationMessage message={message} time={time} variant={variant} />
      </>
    </NotificationWrapper>
  )
}

function NotificationPostLike({ notification }: NotificationPostLikeProps) {
  const { author, image, time, variant } = notification;
  const message = `${author} liked your post 👍`;

  return (
    <NotificationWrapper variant={variant}>
      <>
        <div className='w-[32px] min-w-[32px] h-[32px] min-h-[32px] overflow-hidden rounded-full relative'>
          <Image src={image} alt={author} layout='fill' objectFit='cover' />
        </div>
        <NotificationMessage message={message} time={time} variant={variant} />
      </>
    </NotificationWrapper>
  )
}

function NotificationTradeSuccess({ notification }: NotificationTradeSuccessProps) {
  const { authors, time, variant } = notification;

  return (
    <NotificationWrapper variant={variant}>
      <>
        <div className='w-[60px] min-w-[60px] h-[60px] min-h-[60px] overflow-hidden rounded-full relative'>
          <Image src={tradeSuccessImage} alt='Trade success' layout='fill' objectFit='cover' />
          { authors.map(({ author, image }, index) => (
            <div className={`absolute top-1/2 -translate-y-1/2 h-[14.84px] w-[14.84px] rounded-full overflow-hidden ${ index < 1 ? 'left-[18px] z-[2]' : 'right-[18px] z-[1]' }`}>
              <Image src={image} alt={author} layout='fill' objectFit='contain' />
            </div>
          )) }
        </div>
        <NotificationMessage message='Traded your Item sucessfully' time={time} variant={variant} />
      </>
    </NotificationWrapper>
  )
}

function NotificationNewUpdate({ notification }: NotificationNewUpdateProps) {
  const { message, time, variant } = notification;

  return (
    <NotificationWrapper variant={variant}>
      <>
        <div className='ml-[10px] relative w-[47px] min-w-[47px] h-[45.41px] min-h-[45.41px] overflow-hidden rounded-full'>
          <Image src={boltImage} alt='Bolt' layout='fill' objectFit='cover' />
        </div>
        <NotificationMessage message={message} time={time} variant={variant} />
      </>
    </NotificationWrapper>
  )
}

export default function NotificationComponent({ notification }: any) {
  switch (notification.variant) {
    case 'new_publish':
      return <NotificationNewPublish notification={notification} />;
    case 'post_like':
      return <NotificationPostLike notification={notification} />;
    case 'trade_success':
      return <NotificationTradeSuccess notification={notification} />;
    case 'new_update':
      return <NotificationNewUpdate notification={notification} />;
    default:
      return <div>Uoops</div>;
  }
}