import type { Attachment } from '@/types';
import cn from 'classnames';
import client from '@/data/client';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import Image from '@/components/ui/image';
import { CloseIcon } from '@/components/icons/close-icon';
import Button from '@/components/ui/button';
import { SpinnerIcon } from '@/components/icons/spinner-icon';
import { PlusIcon } from '@/components/icons/plus-icon';

function getDefaultValues(attachment: Attachment[] | null) {
  if (!attachment) return null;
  return Array.isArray(attachment) ? attachment : [attachment];
}

export default function CoverUploader({ onChange, value, name, onBlur }: any) {
  let [attachments, setAttachments] = useState<Attachment[] | null>(
    getDefaultValues(value)
  );
  useEffect(() => {
    setAttachments(getDefaultValues(value));
  }, [value]);

  const { mutate, isLoading } = useMutation(client.settings.upload, {
    onSuccess: (response) => {
      const data = response[0];
      onChange(data);
      setAttachments(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onDrop = useCallback(
    (acceptedFiles) => {
      mutate(acceptedFiles);
    },
    [mutate]
  );
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  function remove(id: string) {
    if (!attachments) return;
    const newAttachments = attachments.filter(
      (attachment) => attachment.id !== id
    );
    if (!newAttachments.length) {
      setAttachments(null);
      onChange(null);
      return;
    }
    setAttachments(newAttachments);
    const data = newAttachments[0];
    onChange(data);
  }

  return (
    <div className="relative flex flex-wrap gap-2.5">
      <div
        {...getRootProps({
          className: cn(
            'relative border-dashed border-2 border-light-500 dark:border-dark-600 text-center flex flex-col justify-center hover:text-black dark:hover:text-light items-center cursor-pointer focus:border-accent-400 focus:outline-none w-full h-64'
          ),
        })}
      >
        <input
          {...getInputProps({
            name,
            onBlur,
          })}
        />
        {Array.isArray(attachments)
          ? attachments.map(({ id, original }) => (
              <div key={id} className="w-full h-full">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    alt="Avatar"
                    src={original.replace('localhost', 'localhost:8000')}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(id);
                  }}
                  variant="icon"
                  className="p-3 absolute top-0 right-0"
                >
                  <CloseIcon className="h-4 w-4 3xl:h-5 3xl:w-5" />
                </Button>
              </div>
            ))
          : 'Upload Your Cover Image (1920 X 480)'}

        {isLoading && (
          <span
            className={`${
              attachments ? 'absolute top-1/2 mt-0' : 'mt-2.5'
            } flex items-center gap-1 font-medium text-light-500`}
          >
            <SpinnerIcon className="h-auto w-5 animate-spin text-brand" />{' '}
            {'Loading...'}
          </span>
        )}
      </div>
    </div>
  );
}
