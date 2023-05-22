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
import { AddPackageIcon } from '../icons/post/add-package-icon';
import Dropdown from '@/components/ui/forms/dropdown';
import Textarea from '../ui/forms/textarea';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';

type CreatePostPackageItemProps = {
  title: string;
  isExtended: boolean;
  setIsExtended: any;
};

const CreatePostPackageItem: React.FC<CreatePostPackageItemProps> = ({
  title,
  isExtended,
  setIsExtended,
}) => {
  const baseTagifySettings = {
    blacklist: [],
    maxTags: 100,
    backspace: 'edit',
    placeholder: 'Add your Keyword',
    editTags: 0,
    dropdown: {
      enabled: 0,
    },
    callbacks: {},
  };

  const handleChange = (e: any) => {
    console.log(
      e.type,
      ' ==> ',
      e.detail.tagify.value.map((item: any) => item.value)
    );
  };

  const settings = {
    ...baseTagifySettings,
    whitelist: [],
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
    },
  };

  return (
    <div
      className={`${
        isExtended && title != 'BASIC' ? 'mt-10' : 'mt-0'
      } flex w-full flex-col items-start justify-between gap-4`}
    >
      <div className="ml-8 flex flex-row items-center justify-start gap-8">
        <p className="font-poppins text-[18px] font-semibold text-brand">
          {title}
        </p>
        {!isExtended && (
          <div className="flex h-[68px] items-center rounded-[8px] bg-light-100 px-6 backdrop-blur hover:bg-light-400 dark:bg-dark-200 hover:dark:bg-dark-400 md:px-24">
            <button
              className="flex flex-row items-center justify-center gap-2"
              onClick={() => setIsExtended(true)}
            >
              <AddPackageIcon className="h-[20px] w-[20px] text-dark focus-visible:outline-none dark:text-light" />
              <p className="font-poppins text-[14px] text-dark dark:text-light">
                Add 2 more Package
              </p>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex w-full flex-col items-start justify-center gap-4 md:flex-row">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="mx-4 flex flex-row items-center justify-start gap-4">
            <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
              Package Name
            </p>
            <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
          </div>
          <div className="flex w-full">
            <Input
              type="search"
              placeholder="Enter your post Title"
              className="w-full"
              inputClassName="font-poppins rounded-[10px]"
              label={''}
            />
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col items-start justify-center gap-4 md:mt-0">
          <div className="mx-4 flex flex-row items-center justify-start gap-4">
            <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
              Price
            </p>
            <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
          </div>
          <div className="flex w-full">
            <Input
              type="search"
              placeholder="Enter your post Title"
              className="w-full"
              inputClassName="font-poppins rounded-[10px]"
              label={''}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full flex-col items-start justify-center gap-4">
        <div className="mx-4 flex flex-row items-center justify-start gap-4">
          <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
            Package Description
          </p>
          <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
        </div>
        <div className="relative w-full">
          <Textarea
            label={''}
            placeholder="Enter your package description"
            className="w-full"
            inputClassName="resize-none bg-transparent mb-8 rounded-[10px] font-poppins "
          />{' '}
          <span className="absolute bottom-1 right-1 block cursor-pointer pb-2.5 font-poppins font-normal text-dark/70 dark:text-light/70">
            {'30 words'}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-4">
        <div className="mx-4 flex flex-row items-center justify-start gap-4">
          <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
            Keywords
          </p>
          <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
        </div>
        <div className="flex w-full">
          <Tags settings={settings} initialValue={[]} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPackageItem;
