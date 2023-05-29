import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';
import ModalBackdrop from './modal-backdrop';
import NotificationModal from './notification-modal';
import { NotificationFillIcon } from '../icons/notification-fill-icon';

export default function NotificationButton({
  className = 'flex',
}: {
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notifications_count = 8;

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      window.innerWidth > 640
        ? (document.documentElement.style.paddingRight = '6px')
        : null;
    } else {
      document.documentElement.style.overflow = 'visible';
      document.documentElement.style.paddingRight = '0px';
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="relative">
        <Button
          variant="icon"
          aria-label="Notification"
          className={className}
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <NotificationFillIcon className="h-5 w-5" />
        </Button>

        {notifications_count ? (
          <div className="absolute -top-3 -right-2.5 flex min-h-[20px] min-w-[20px] shrink-0 items-center justify-center rounded-full border-2 border-light-100 bg-brand px-0.5 text-10px font-bold leading-none text-light dark:border-dark-250">
            <div className="text-[8px] font-poppins font-semibold text-[#FDFDFD]">
              {notifications_count.toString().padStart(2, '0')}+
            </div>
          </div>
        ) : null}
      </div>

      {isModalOpen ? (
        <ModalBackdrop>
          <NotificationModal />
        </ModalBackdrop>
      ) : null}
    </>
  );
}
