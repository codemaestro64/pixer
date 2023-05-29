import Input from '@/components/ui/forms/input';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { InfoIcon } from '../icons/post/info-icon';
import { ContinueIcon } from '../icons/post/continue-icon';
import Dropdown from '@/components/ui/forms/dropdown';
import Textarea from '../ui/forms/textarea';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import Button from '../ui/button';
import CreateServiceImages from './create-service-images';
import toast from 'react-hot-toast';
import { SKILLS_SUGGESTIONS } from '@/lib/constants';
import { useCategories } from '@/data/category';
import { useTags } from '@/data/tags';

type CreateServiceDetailsProps = {
  onContinue: any;
  onSaveAsDraft: any;
};

const CreateServiceDetails: React.FC<CreateServiceDetailsProps> = ({
  onContinue,
  onSaveAsDraft,
}) => {
  const tagsRef = useRef<HTMLDivElement>();
  const { tags, isLoading: isLoadingTags } = useTags({
    limit: 999,
  });
  const { categories } = useCategories({
    limit: 999,
  });

  const [detailsData, setDetailsData] = useState({
    title: '',
    categories: '',
    sub_categories: '',
    descr: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]); //max 5 files

  const baseTagifySettings = {
    blacklist: [],
    maxTags: 100,
    backspace: 'edit',
    placeholder: 'Add your Keyword',
    editTags: 0,
    dropdown: {
      maxItems: 100,
      enabled: 0,
      classname: 'tags-look',
    },
    callbacks: {},
  };

  const handleChange = (e: any) => {
    // const tags: string[] = e.detail.tagify.value.map((item: any) => item.value);
    // setSelectedTags(tags);
  };

  const settings = {
    ...baseTagifySettings,
    whitelist: [],
    //enforceWhitelist: true,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
    },
  };

  const onProcessContinue = () => {
    if (detailsData.title.length == 0) {
      toast.error(<b>Please input title!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    if (detailsData.categories.length == 0) {
      toast.error(<b>Please select category!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    if (detailsData.sub_categories.length == 0) {
      toast.error(<b>Please select sub-category!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    if (detailsData.descr.length == 0) {
      toast.error(<b>Please input description!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    const curTags: string[] = tagsRef.current?.value.map(
      (item: any) => item.value
    );

    if (curTags.length == 0) {
      toast.error(<b>Please add keywords!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    let uploadedFiles = selectedFiles.filter((eachFile) => eachFile != null);
    if (uploadedFiles.length == 0) {
      toast.error(<b>Please add one image at least!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    onContinue({
      ...detailsData,
      keywords: curTags.join(','),
      files: uploadedFiles,
    });
  };

  const onProcessSaveAsDraft = () => {
    onSaveAsDraft();
  };

  const gotFile = (nImageIdx: number, newFile: File) => {
    let updatedFiles = [...selectedFiles];
    updatedFiles[nImageIdx] = newFile;

    setSelectedFiles(updatedFiles);
  };

  useEffect(() => {
    tagsRef.current?.settings.whitelist = tags.map((item) => item.name);
  }, [isLoadingTags]);

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
              value={detailsData.title}
              onChange={(e) =>
                setDetailsData({ ...detailsData, title: e.target.value })
              }
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
              <Dropdown
                egValue="Eg: Graphic Design"
                values={categories.map((item) => item.name)}
                selectedValue={detailsData.categories}
                setSelectedValue={(value: string) =>
                  setDetailsData({ ...detailsData, categories: value })
                }
              />
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
              <Dropdown
                egValue="Eg: Graphic Design"
                values={categories.map((item) => item.name)}
                selectedValue={detailsData.sub_categories}
                setSelectedValue={(value: string) =>
                  setDetailsData({ ...detailsData, sub_categories: value })
                }
              />
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
              value={detailsData.descr}
              onChange={(e) => {
                if (e.target.value.split(' ').length <= 30)
                  setDetailsData({ ...detailsData, descr: e.target.value });
              }}
              inputClassName="resize-none bg-transparent mb-8 rounded-[10px] font-poppins "
            />{' '}
            <span className="absolute bottom-1 right-1 block cursor-pointer pb-2.5 font-poppins font-normal text-dark/70 dark:text-light/70">
              {`${
                detailsData.descr.trim().length === 0
                  ? 30
                  : 30 - detailsData.descr.trim().split(' ').length
              } words`}
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
            <Tags
              tagifyRef={tagsRef}
              settings={settings}
              value={selectedTags}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-col gap-4 md:mt-0 md:w-5/12">
        <CreateServiceImages gotFile={gotFile} />
        <Button
          className="mt-4 w-full rounded-[8px] font-poppins text-sm tracking-[0.2px]"
          onClick={onProcessContinue}
        >
          Continue
          <ContinueIcon className="h-3 w-3 text-light focus-visible:outline-none" />
        </Button>
        <Button
          onClick={onProcessSaveAsDraft}
          variant="outline"
          className="w-full rounded-[8px] border border-light-500 bg-transparent font-poppins text-sm tracking-[0.2px] text-dark-600 hover:bg-light-600 dark:border-dark-600 dark:text-light-400 dark:hover:bg-dark-400"
        >
          Save As Draft
        </Button>
      </div>
    </div>
  );
};

export default CreateServiceDetails;
