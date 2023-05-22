import { useTranslation } from 'next-i18next';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { StepIcon } from '../icons/post/step-icon';
import CreatePostDetails from './create-post-details';
import CreatePostPackage from './create-post-package';
import { useModalAction } from '../modal-views/context';

const CreatePostContainer = () => {
  const { openModal } = useModalAction();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const onContinue = () => {
    if (currentStep == 2) {
      openModal('POST_SUCCESS_VIEW');
    }

    setCurrentStep(currentStep + 1);
  };

  const onSaveAsDraft = () => {};

  return (
    <div className="flex flex-col items-start justify-center px-[16px] pb-[35px] md:pt-[24px] 2xl:pb-[58px] 2xl:pt-[38px]">
      <div className="font-poppins text-[42px] text-black dark:text-white">
        Create a Post
      </div>
      <div className="mx-0 mt-2 flex flex-row items-start justify-center gap-1 md:mx-2">
        <p className="font-poppins text-[16px] text-dark-700">Home</p>
        <p className="font-poppins text-[16px] text-dark-700">{`>`}</p>
        <p className="font-poppins text-[16px] text-brand">Create Post</p>
      </div>
      <div className="mx-0 mt-4 flex flex-wrap items-start gap-2 md:mx-2 md:flex-row">
        <div className="flex flex-row items-center justify-center gap-4">
          <p
            className={`${
              currentStep == 1 ? 'italic text-brand' : 'text-dark-700'
            } font-poppins text-[16px]`}
          >
            Post Details
          </p>
          <StepIcon
            className={`${
              currentStep == 1 ? 'text-brand' : 'text-dark-700'
            } h-4 w-4  focus-visible:outline-none`}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <p
            className={`${
              currentStep == 2 ? 'italic text-brand' : 'text-dark-700'
            } font-poppins text-[16px]`}
          >
            Package
          </p>
          <StepIcon
            className={`${
              currentStep == 2 ? 'text-brand' : 'text-dark-700'
            } h-4 w-4  focus-visible:outline-none`}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <p
            className={`${
              currentStep == 3 ? 'italic text-brand' : 'text-dark-700'
            } font-poppins text-[16px]`}
          >
            Confirmation
          </p>
        </div>
      </div>

      {currentStep == 1 ? (
        <CreatePostDetails
          onContinue={onContinue}
          onSaveAsDraft={onSaveAsDraft}
        />
      ) : (
        <CreatePostPackage
          onContinue={onContinue}
          onSaveAsDraft={onSaveAsDraft}
        />
      )}
    </div>
  );
};

export default CreatePostContainer;
