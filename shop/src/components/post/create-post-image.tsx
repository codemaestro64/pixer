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

type CreatePostImageProp = {
  isBig: boolean;
};

const CreatePostImage: React.FC<CreatePostImageProp> = ({ isBig }) => {
  return (
    <div
      className={`${
        isBig ? 'h-[212px]' : 'h-32'
      } focus:border-accent-400 relative flex w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-light-500 text-center hover:text-black focus:outline-none dark:border-dark-600 dark:hover:text-light`}
    >
      <UploadImageIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
      <p className="font-poppins text-[14px] text-dark-800 dark:text-dark-800">
        Upload your Image
      </p>
    </div>
  );
};

export default CreatePostImage;
