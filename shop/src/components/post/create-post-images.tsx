import successIcon from '@/assets/images/post/party-popper.png';
import SuccessBg from '@/assets/images/post/sprinkles.png';
import Image from '@/components/ui/image';
import Button from '../ui/button';
import { useTranslation } from 'next-i18next';
import Input from '@/components/ui/forms/input';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { InfoIcon } from '../icons/post/info-icon';
import { ContinueIcon } from '../icons/post/continue-icon';
import { UploadImageIcon } from '../icons/post/upload-image-icon';
import { AddImageIcon } from '../icons/post/add-image-icon';
import Dropdown from '@/components/ui/forms/dropdown';
import Textarea from '../ui/forms/textarea';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import CreatePostImage from './create-post-image';

export default function CreatePostImages() {
  const [imageCounter, setImageCounter] = useState<number>(1);
  const maxImageAmount = 4;

  const makeMoreImages = () => {
    let imagesList = [];

    for (let nIdx = 0; nIdx < imageCounter; nIdx++) {
      imagesList.push(
        <div className="flex w-full flex-row items-center justify-center gap-4">
          <CreatePostImage isBig={false} />
          <CreatePostImage isBig={false} />
          {nIdx === imageCounter - 1 && imageCounter < maxImageAmount && (
            <div
              className="relative flex h-32 w-[90px] flex-shrink-0 flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-light-500 bg-light-300 text-center hover:bg-light-500 hover:text-black focus:outline-none dark:border-dark-600 dark:bg-dark-100 dark:hover:bg-dark-600 dark:hover:text-light"
              onClick={() => {
                setImageCounter(
                  imageCounter < maxImageAmount
                    ? imageCounter + 1
                    : imageCounter
                );
              }}
            >
              <AddImageIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
            </div>
          )}
        </div>
      );
    }

    return imagesList;
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="mx-4 flex flex-row items-center justify-start gap-4">
          <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
            Upload Image
          </p>
          <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
        </div>
        <div className="flex w-full">
          <CreatePostImage isBig={true} />
        </div>
      </div>

      {imageCounter && makeMoreImages()}
    </div>
  );
}
