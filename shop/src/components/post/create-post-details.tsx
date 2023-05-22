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
import Button from '../ui/button';
import CreatePostImages from './create-post-images';

type CreatePostDetailsProps = {
  onContinue: any;
  onSaveAsDraft: any;
};

const CreatePostDetails: React.FC<CreatePostDetailsProps> = ({
  onContinue,
  onSaveAsDraft,
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
    <div className="mt-12 flex w-full flex-col items-start justify-between gap-4 md:flex-row">
      <div className="flex w-full flex-col gap-8 md:w-7/12">
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="mx-4 flex flex-row items-center justify-start gap-4">
            <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
              Title
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
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="ml-4 flex flex-row items-center justify-start gap-4">
              <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
                Categories
              </p>
              <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
            </div>
            <div className="flex w-full">
              <Dropdown />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="ml-4 flex flex-row items-center justify-start gap-4">
              <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
                Sub Categories
              </p>
              <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
            </div>
            <div className="flex w-full">
              <Dropdown />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="mx-4 flex flex-row items-center justify-start gap-4">
            <p className="font-poppins text-[16px] text-dark-400 dark:text-light">
              Post Description
            </p>
            <InfoIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
          </div>
          <div className="relative w-full">
            <Textarea
              label={''}
              placeholder="Enter your post description"
              className="w-full"
              inputClassName="resize-none bg-transparent mb-8 rounded-[10px] font-poppins "
            />{' '}
            <span className="absolute bottom-1 right-1 block cursor-pointer pb-2.5 font-poppins font-normal text-dark/70 dark:text-light/70">
              {'30 words'}
            </span>
          </div>
        </div>
        <div className="-mt-8 flex flex-col items-start justify-center gap-4">
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
      <div className="mt-10 flex w-full flex-col gap-4 md:mt-0 md:w-5/12">
        <CreatePostImages />
        <Button
          className="mt-4 w-full rounded-[8px] font-poppins text-sm tracking-[0.2px]"
          onClick={onContinue}
        >
          Continue
          <ContinueIcon className="h-3 w-3 text-light focus-visible:outline-none" />
        </Button>
        <Button
          onClick={onSaveAsDraft}
          variant="outline"
          className="w-full rounded-[8px] border border-light-500 bg-transparent font-poppins text-sm tracking-[0.2px] text-dark-600 hover:bg-light-600 dark:border-dark-600 dark:text-light-400 dark:hover:bg-dark-400"
        >
          Save As Draft
        </Button>
      </div>
    </div>
  );
};

export default CreatePostDetails;
