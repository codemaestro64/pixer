import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Scrollbar from '@/components/ui/scrollbar';
import ChatDetailSection from '@/components/chat/details/section';
import ChatMedia from '@/components/chat/details/media';
import ChatFile from '@/components/chat/details/file';
import ChatStarMessage from '@/components/chat/details/starmsg';
import ChatHeader from '@/components/chat/content/header';

import sampleAvatar1 from '@/assets/images/avatars/1.png';
import sampleMedia1 from '@/assets/images/medias/1.png';
import sampleMedia2 from '@/assets/images/medias/2.png';
import sampleMedia3 from '@/assets/images/medias/3.png';

const mediaData = [
  { media: sampleMedia1 },
  { media: sampleMedia2 },
  { media: sampleMedia3 },
];

const sections = [
  { title: 'Media', amount: 20 },
  { title: 'Files', amount: 20 },
  { title: 'Star Message', amount: 20 },
];

const filesData = [
  { type: 'pdf', name: 'Whitepaper.pdf', size: '3.7MB', date: '22, Jan 2021' },
  { type: 'jpg', name: 'Logo.jpg', size: '3.7MB', date: '22, Jan 2021' },
  { type: 'mp4', name: 'Pargy.mp4', size: '3.7MB', date: '22, Jan 2021' },
  { type: 'fig', name: 'Design.fig', size: '3.7MB', date: '22, Jan 2021' },
];

const starMsgData = [
  {
    type: 'opposite',
    message: 'OoOo, Yeah, Thanks really Cool!',
    name: 'Rehan Wango',
    date: '01 Jan 2023.4.23',
  },
  {
    type: 'mine',
    message:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    name: 'Rehan Wango',
    date: '01 Jan 2023.4.23',
  },
];

const ChatDetails = () => {
  const { t } = useTranslation('common');
  let [searchText, setSearchText] = useState('');

  const onClickedSection = (title: string) => {
    console.log('Section is clicked - ', title);
  };

  return (
    <div className="hidden h-full w-full max-w-[395px] lg:block lg:w-[30%]">
      <div className="flex h-full flex-col">
        <ChatHeader
          name="Neil Sims"
          online={true}
          avatar={sampleAvatar1}
          forCall={false}
          onSelectChannel={() => console.log('testing')}
        />

        <Scrollbar className="relative mt-10 h-full w-full">
          <div className="flex w-full flex-col px-4">
            <ChatDetailSection
              {...sections[0]}
              onClickedSeeAll={onClickedSection}
            />

            <div className="mt-4 grid grid-cols-3 gap-4">
              {mediaData.map((item, key) => (
                <ChatMedia key={key} {...item} />
              ))}
            </div>

            <ChatDetailSection
              {...sections[1]}
              onClickedSeeAll={onClickedSection}
            />

            <ul role="list" className="mt-4">
              {filesData.map((item, key) => (
                <ChatFile key={key} {...item} />
              ))}
            </ul>

            <ChatDetailSection
              {...sections[2]}
              onClickedSeeAll={onClickedSection}
            />

            <div className="flex flex-col">
              {starMsgData.map((item, key) => (
                <ChatStarMessage key={key} {...item} />
              ))}
            </div>
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default ChatDetails;
