import Image from '@/components/ui/image';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { UploadImageIcon } from '../icons/post/upload-image-icon';

type CreateServiceImageProp = {
  nIdx: number;
  isBig: boolean;
  onAddedFile: any;
};

const CreateServiceImage: React.FC<CreateServiceImageProp> = ({
  nIdx,
  isBig,
  onAddedFile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<any | null>(null);

  const getExtension = (filename: string) => {
    return filename.split('.').pop()!;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.nativeEvent.target;
    const selectedFiles = event.target.files;
    if (selectedFiles?.length == 0) {
      return;
    }

    const url = URL.createObjectURL(selectedFiles![0]);
    setFilePreview(url);
    setFile(selectedFiles![0]);
    console.log('sdsdsd - ', selectedFiles![0].name);
    onAddedFile(nIdx, selectedFiles![0]);
  };

  const onSelectFile = () => {
    inputRef.current?.click();
  };

  const makeUI = () => {
    if (file) {
      if (['mov', 'mp4', 'avi'].includes(getExtension(file.name))) {
        //video
        return (
          <div className="relative flex h-full w-full rounded-[8px]">
            <video
              controls
              width="100%"
              height="100%"
              className="m-0 block rounded-[8px]"
              src={filePreview}
            />{' '}
          </div>
        );
      } else {
        //image
        return (
          <div className="relative flex h-full w-full rounded-[8px]">
            <Image
              alt={'Attachment'}
              layout="fill"
              quality={100}
              objectFit="cover"
              src={filePreview}
              className="rounded-[8px]"
            />
          </div>
        );
      }
    } else {
      return (
        <>
          <UploadImageIcon className="h-4 w-4 text-dark-800 focus-visible:outline-none" />
          <p className="font-poppins text-[14px] text-dark-800 dark:text-dark-800">
            Upload your Image
          </p>
        </>
      );
    }
  };

  return (
    <div
      onClick={onSelectFile}
      className={`${
        isBig ? 'h-[212px]' : 'h-32'
      } focus:border-accent-400 relative flex w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-light-500 text-center hover:text-black focus:outline-none dark:border-dark-600 dark:hover:text-light`}
    >
      <input
        ref={inputRef}
        className="feed-file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, .mov, .mp4, .avi"
      />

      {makeUI()}
    </div>
  );
};

export default CreateServiceImage;
