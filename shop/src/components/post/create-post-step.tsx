import { StepIcon } from '../icons/post/step-icon';

type CreatePostStepProp = {
  currentStep: number;
};

const CreatePostStep: React.FC<CreatePostStepProp> = ({ currentStep }) => {
  return (
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
          Confirmation
        </p>
      </div>
    </div>
  );
};

export default CreatePostStep;
