import { useTranslation } from 'next-i18next';
import Input from '@/components/ui/forms/input';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { InfoIcon } from '../icons/post/info-icon';
import { ContinueIcon } from '../icons/post/continue-icon';
import { UploadImageIcon } from '../icons/post/upload-image-icon';
import { AddPackageIcon } from '../icons/post/add-package-icon';
import Dropdown from '@/components/ui/forms/dropdown';
import Textarea from '../ui/forms/textarea';
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import Button from '../ui/button';
import CreatePostPackageItem from './create-post-package-item';

type CreatePostPackageProps = {
  onContinue: any;
  onSaveAsDraft: any;
};

const CreatePostPackage: React.FC<CreatePostPackageProps> = ({
  onContinue,
  onSaveAsDraft,
}) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);

  return (
    <div className="mt-12 flex w-full flex-col items-start justify-between gap-4 md:w-11/12">
      <CreatePostPackageItem
        title={'BASIC'}
        isExtended={isExtended}
        setIsExtended={setIsExtended}
      />

      {isExtended && (
        <>
          <CreatePostPackageItem
            title={'STANDARD'}
            isExtended={isExtended}
            setIsExtended={setIsExtended}
          />
          <CreatePostPackageItem
            title={'PREMIUM'}
            isExtended={isExtended}
            setIsExtended={setIsExtended}
          />
        </>
      )}

      <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        <Button
          onClick={onSaveAsDraft}
          variant="outline"
          className="w-full rounded-[8px] border border-light-500 bg-transparent font-poppins text-sm tracking-[0.2px] text-dark-600 hover:bg-light-600 dark:border-dark-600 dark:text-light-400 dark:hover:bg-dark-400"
        >
          Save As Draft
        </Button>
        <Button
          className="w-full rounded-[8px] font-poppins text-sm tracking-[0.2px]"
          onClick={onContinue}
        >
          Continue
          <ContinueIcon className="h-3 w-3 text-light focus-visible:outline-none" />
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPackage;
