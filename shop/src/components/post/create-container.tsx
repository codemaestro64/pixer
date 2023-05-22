import { useTranslation } from 'next-i18next';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { StepIcon } from '../icons/post/step-icon';
import CreatePostStep from './create-post-step';
import CreatePostDetails from './create-post-details';
import CreatePostPackage from './create-post-package';
import { useModalAction } from '../modal-views/context';
import { useMutation } from 'react-query';
import { useMe } from '@/data/user';
import toast from 'react-hot-toast';
import client from '@/data/client';

const CreatePostContainer = () => {
  const { openModal } = useModalAction();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [details, setDetails] = useState<any>({});
  const [packages, setPackages] = useState<any>([]);

  const { me } = useMe();

  const { mutate: postMutate, isLoading } = useMutation(client.posts.create, {
    onSuccess: (res) => {
      setCurrentStep(currentStep + 1);
      openModal('POST_SUCCESS_VIEW');
    },
    onError: (err: any) => {
      console.log(err.response.data, 'error');

      toast.error(<b>Something went wrong. Please try again!</b>, {
        className: '-mt-10 xs:mt-0',
      });
    },
  });

  const { mutate: uploadMutate, isLoading: isUploading } = useMutation(
    client.settings.upload,
    {
      onSuccess: (response) => {
        postMutate({
          title: details.title,
          categories: details.categories,
          sub_categories: details.sub_categories,
          descr: details.descr,
          keywords: details.keywords,
          attachments: response,
          packages,
        });
      },
      onError: (error) => {
        console.log(error);
        toast.error(<b>Something went wrong. Please try again!</b>, {
          className: '-mt-10 xs:mt-0',
        });
      },
    }
  );

  const onContinue = (data: any) => {
    if (currentStep == 1) {
      setDetails(data);
      setCurrentStep(currentStep + 1);
    }

    if (currentStep == 2) {
      setPackages(data);
      setTimeout(() => uploadMutate(details.files), 300);
    }
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

      <CreatePostStep currentStep={currentStep} />

      {currentStep == 1 ? (
        <CreatePostDetails
          onContinue={onContinue}
          onSaveAsDraft={onSaveAsDraft}
        />
      ) : (
        <CreatePostPackage
          onContinue={onContinue}
          onSaveAsDraft={onSaveAsDraft}
          isLoading={isLoading || isUploading}
        />
      )}
    </div>
  );
};

export default CreatePostContainer;
