import FeedButtonAlt from './feed-button-alt';
import { PictureIcon } from '../icons/picture-icon';
import { VideoIcon } from '../icons/video-icon';
import { ChatPullFillIcon } from '../icons/chat-pull-fill-icon';
import Image from '@/components/ui/image';
import { CloseIcon } from '@/components/icons/close-icon';
import { AttachmentIcon } from '@/components/icons/chat/attachment-icon';
import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import client from '@/data/client';
import Button from '@/components/ui/button';
import { useMe } from '@/data/user';

export default function FeedActions({
  feedDescr,
  setFeedDescr,
  triggerFeeds,
  setTriggerFeeds,
}: {
  feedDescr: string;
  setFeedDescr: any;
  triggerFeeds: boolean;
  setTriggerFeeds: any;
}) {
  const { t } = useTranslation('common');
  const { me } = useMe();

  const inputVideoRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputAttachmentRef = useRef<HTMLInputElement>(null);

  const [feedType, setFeedType] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<any[]>([]);

  const { mutate: feedMutate, isLoading } = useMutation(client.feeds.create, {
    onSuccess: (res) => {
      setFiles([]);
      setFeedType('');
      setFeedDescr('');

      setTriggerFeeds(!triggerFeeds);
      toast.success(<b>Your feed is posted successfully!</b>, {
        className: '-mt-10 xs:mt-0',
      });
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
        console.log(response);

        feedMutate({
          user_id: me!.id,
          descr: feedDescr,
          type: feedType,
          content: response,
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

  const onRemoveFile = (nFileIdx: number) => {
    if (isLoading || isUploading) return;

    let updatedFiles = [...files];
    updatedFiles.splice(nFileIdx, 1);

    let updatedFilePreviews = [...filePreviews];
    updatedFilePreviews.splice(nFileIdx, 1);

    setFiles(files.length > 1 ? updatedFiles : []);
    setFilePreviews(filePreviews.length > 1 ? updatedFilePreviews : []);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    event.nativeEvent.target;
    const selectedFiles = event.target.files;

    if (inputImageRef && inputImageRef.current?.contains(event.target)) {
      setFeedType('image');
    }

    if (inputVideoRef && inputVideoRef.current?.contains(event.target)) {
      setFeedType('video');
    }

    if (
      inputAttachmentRef &&
      inputAttachmentRef.current?.contains(event.target)
    ) {
      setFeedType('attachment');
    }

    let selectedFilesThumbnail: any[] = [];
    let tempSelectedFiles: File[] = [];

    for (let nIdx = 0; nIdx < selectedFiles!.length; nIdx++) {
      const url = URL.createObjectURL(selectedFiles![nIdx]);
      selectedFilesThumbnail.push(url);
      tempSelectedFiles.push(selectedFiles![nIdx]);
    }

    setFiles(tempSelectedFiles);
    setFilePreviews(selectedFilesThumbnail);
  };

  const onSelectedImages = () => {
    if (isLoading || isUploading) return;

    inputImageRef.current?.click();
  };

  const onSelectedVideo = () => {
    if (isLoading || isUploading) return;

    inputVideoRef.current?.click();
  };

  const onSelectedAttachment = () => {
    if (isLoading || isUploading) return;

    inputAttachmentRef.current?.click();
  };

  const onSelectedPoll = () => {
    if (isLoading || isUploading) return;
  };

  const postFeed = () => {
    if (isLoading || isUploading) return;

    if (feedDescr.length == 0 || files.length == 0) return;

    //mutate(data);
    if (!me) {
      toast.error(<b>Something went wrong. Please try again!</b>, {
        className: '-mt-10 xs:mt-0',
      });

      return;
    }

    uploadMutate(files);
  };

  const makeFilesPreview = () => {
    return filePreviews.map((eachFile, index) => {
      if (feedType === 'image') {
        return (
          <li key={index}>
            <div className="flex p-4">
              <div className="relative flex h-[80px] w-[80px] rounded-[8px] border-2 border-light-500 dark:border-dark-500">
                <Image
                  alt={'Attachment'}
                  layout="fill"
                  quality={100}
                  objectFit="cover"
                  src={eachFile}
                  className="rounded-[8px]"
                />
                <button
                  onClick={() => onRemoveFile(index)}
                  aria-label="Close panel"
                  className="absolute -top-[10px] -right-[10px] z-10 rounded-full bg-online p-1 text-dark-900 outline-none transition-all hover:bg-light-400 hover:text-dark focus-visible:outline-none dark:text-dark-800 hover:dark:text-light-200"
                >
                  <CloseIcon className="h-4 w-4 text-white focus-visible:outline-none lg:h-[16px] lg:w-[16px] 3xl:h-5 3xl:w-5" />
                </button>
              </div>
            </div>
          </li>
        );
      } else if (feedType === 'video') {
        return (
          <li key={index}>
            <div className="flex p-4">
              <div className="relative flex h-[80px] w-[80px]">
                <video
                  className="m-0 block rounded-[8px] border-2 border-light-500 dark:border-dark-500"
                  width={80}
                  height={80}
                  src={eachFile}
                />
                <button
                  onClick={() => onRemoveFile(index)}
                  aria-label="Close panel"
                  className="absolute -top-[10px] -right-[10px] z-10 rounded-full bg-online p-1 text-dark-900 outline-none transition-all hover:bg-light-400 hover:text-dark focus-visible:outline-none dark:text-dark-800 hover:dark:text-light-200"
                >
                  <CloseIcon className="h-4 w-4 text-white focus-visible:outline-none lg:h-[16px] lg:w-[16px] 3xl:h-5 3xl:w-5" />
                </button>
              </div>
            </div>
          </li>
        );
      } else {
        return (
          <li key={index}>
            <div className="flex p-4">
              <div className="relative flex h-[80px] w-[80px]">
                <div className="flex h-full w-full items-center justify-center rounded-[8px] border-2  border-light-500 bg-light-600 dark:border-dark-500">
                  <AttachmentIcon className="h-6 w-6 text-white focus-visible:outline-none" />
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  aria-label="Close panel"
                  className="absolute -top-[10px] -right-[10px] z-10 rounded-full bg-online p-1 text-dark-900 outline-none transition-all hover:bg-light-400 hover:text-dark focus-visible:outline-none dark:text-dark-800 hover:dark:text-light-200"
                >
                  <CloseIcon className="h-4 w-4 text-white focus-visible:outline-none" />
                </button>
              </div>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <>
      <input
        ref={inputVideoRef}
        className="feed-file-input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />

      <input
        ref={inputImageRef}
        className="feed-file-input"
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
      />

      <input
        ref={inputAttachmentRef}
        className="feed-file-input"
        type="file"
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <div className="rounded-[18px] bg-[#fdfdfd] px-[23px] py-[17.5px] dark:bg-[#262626] md:px-[16px]">
          <div className="flex ">
            <ul className="scrollbar-hide flex overflow-auto">
              {makeFilesPreview()}
            </ul>
          </div>
        </div>
      )}
      <div className="mt-[6px] rounded-[18px] bg-[#fdfdfd] px-[23px] py-[17.5px] dark:bg-[#262626] md:px-[16px]">
        <div className="flex items-center">
          <ul className="flex flex-wrap gap-[12px]">
            <li>
              <FeedButtonAlt
                label="Images"
                icon={<PictureIcon />}
                onChooseFiles={onSelectedImages}
              />
            </li>
            <li>
              <FeedButtonAlt
                label="Video"
                icon={<VideoIcon />}
                onChooseFiles={onSelectedVideo}
              />
            </li>
            <li>
              <FeedButtonAlt
                label="Pool"
                icon={<ChatPullFillIcon />}
                onChooseFiles={onSelectedPoll}
              />
            </li>
            <li>
              <FeedButtonAlt
                label="Attachment"
                icon={<AttachmentIcon />}
                onChooseFiles={onSelectedAttachment}
              />
            </li>
          </ul>
          <div className="ml-auto">
            <Button
              className="!mt-5 w-full rounded-full text-sm tracking-[0.2px] lg:!mt-7"
              onClick={postFeed}
              isLoading={isUploading || isLoading}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
