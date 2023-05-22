import Input from '@/components/ui/forms/input';
import { useState, forwardRef, Ref, useImperativeHandle } from 'react';
import { InfoIcon } from '../icons/post/info-icon';
import { AddPackageIcon } from '../icons/post/add-package-icon';
import Textarea from '../ui/forms/textarea';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';

export interface PackageItem {
  getInfo: () => void;
}

type CreatePostPackageItemProps = {
  title: string;
  isExtended: boolean;
  setIsExtended: any;
};

const CreatePostPackageItem = forwardRef(
  (
    props: { title: string; isExtended: boolean; setIsExtended: any },
    ref: Ref<PackageItem>
  ) => {
    const { title, isExtended, setIsExtended } = props;

    const [detailsData, setDetailsData] = useState({
      name: '',
      price: '',
      descr: '',
    });

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    function getInfo() {
      return { ...detailsData, keywords: selectedTags.join(',') };
    }

    useImperativeHandle(ref, () => ({ getInfo }));

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
      const tags: string[] = e.detail.tagify.value.map(
        (item: any) => item.value
      );
      setSelectedTags(tags);
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
                value={detailsData.name}
                inputClassName="font-poppins rounded-[10px]"
                onChange={(e) =>
                  setDetailsData({ ...detailsData, name: e.target.value })
                }
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
                value={detailsData.price}
                onChange={(e) =>
                  setDetailsData({ ...detailsData, price: e.target.value })
                }
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
              value={detailsData.descr}
              onChange={(e) => {
                if (e.target.value.split(' ').length <= 30)
                  setDetailsData({ ...detailsData, descr: e.target.value });
              }}
            />
            <span className="absolute bottom-1 right-1 block cursor-pointer pb-2.5 font-poppins font-normal text-dark/70 dark:text-light/70">
              {`${
                detailsData.descr.trim().length === 0
                  ? 30
                  : 30 - detailsData.descr.trim().split(' ').length
              } words`}
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
  }
);
CreatePostPackageItem.displayName = 'Package Item';

export default CreatePostPackageItem;
