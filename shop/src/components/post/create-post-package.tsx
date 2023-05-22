import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { ContinueIcon } from '../icons/post/continue-icon';
import Button from '../ui/button';
import CreatePostPackageItem, { PackageItem } from './create-post-package-item';
import toast from 'react-hot-toast';

type CreatePostPackageProps = {
  onContinue: any;
  onSaveAsDraft: any;
  isLoading: boolean;
};

const CreatePostPackage: React.FC<CreatePostPackageProps> = ({
  onContinue,
  onSaveAsDraft,
  isLoading,
}) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const basicRef = useRef<PackageItem>(null);
  const standardRef = useRef<PackageItem>(null);
  const premiumRef = useRef<PackageItem>(null);

  const validateInfo = (data: any, isRequired: boolean) => {
    if (
      !isRequired &&
      data.name.length === 0 &&
      data.price.length === 0 &&
      data.descr.length === 0 &&
      data.keywords.length === 0
    )
      return 2;

    if (data.name.length === 0) {
      toast.error(<b>Please input package name!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return 1;
    }

    if (data.price.length === 0) {
      toast.error(<b>Please input package price!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return 1;
    }

    if (data.descr.length === 0) {
      toast.error(<b>Please input package description!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return 1;
    }

    if (data.keywords.length === 0) {
      toast.error(<b>Please add keywords!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return 1;
    }

    return 0;
  };

  const onProcessContinue = () => {
    let data = [];

    if (basicRef.current) {
      const itemData = basicRef.current.getInfo();
      const nResult = validateInfo(itemData, true);
      if (nResult == 0) {
        data.push(itemData);
      } else if (nResult == 1) {
        return;
      }
    }

    if (standardRef.current) {
      const itemData = standardRef.current.getInfo();
      const nResult = validateInfo(itemData, false);
      if (nResult == 0) {
        data.push(itemData);
      } else if (nResult == 1) {
        return;
      }
    }

    if (premiumRef.current) {
      const itemData = premiumRef.current.getInfo();
      const nResult = validateInfo(itemData, false);
      if (nResult == 0) {
        data.push(itemData);
      } else if (nResult == 1) {
        return;
      }
    }

    onContinue(data);
  };

  const onProcessSaveAsDraft = () => {
    onSaveAsDraft();
  };

  return (
    <div className="mt-12 flex w-full flex-col items-start justify-between gap-4 md:w-11/12">
      <CreatePostPackageItem
        ref={basicRef}
        title={'BASIC'}
        isExtended={isExtended}
        setIsExtended={setIsExtended}
      />

      {isExtended && (
        <>
          <CreatePostPackageItem
            ref={standardRef}
            title={'STANDARD'}
            isExtended={isExtended}
            setIsExtended={setIsExtended}
          />
          <CreatePostPackageItem
            ref={premiumRef}
            title={'PREMIUM'}
            isExtended={isExtended}
            setIsExtended={setIsExtended}
          />
        </>
      )}

      <div className="mt-6 flex w-full flex-col items-center justify-center gap-4 md:flex-row">
        <Button
          onClick={onProcessSaveAsDraft}
          variant="outline"
          className="w-full rounded-[8px] border border-light-500 bg-transparent font-poppins text-sm tracking-[0.2px] text-dark-600 hover:bg-light-600 dark:border-dark-600 dark:text-light-400 dark:hover:bg-dark-400"
        >
          Save As Draft
        </Button>
        <Button
          className="w-full rounded-[8px] font-poppins text-sm tracking-[0.2px]"
          onClick={onProcessContinue}
          isLoading={isLoading}
        >
          Continue
          <ContinueIcon className="h-3 w-3 text-light focus-visible:outline-none" />
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPackage;
