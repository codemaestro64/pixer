import { useEffect, useState } from 'react';
import { ChatFillIcon } from '../icons/chat-fill-icon';
import { useMe } from '@/data/user';
import { Follow, Shop, User } from '@/types';
import { useMutation } from 'react-query';
import client from '@/data/client';
import { SpinnerIcon } from '../icons/spinner-icon';

export function AuthorsButton({
  label,
  primary,
  bold,
}: {
  label: string;
  primary?: boolean;
  bold?: boolean;
}) {
  return (
    <button
      className={`min-w-[120px] px-[35px] font-poppins rounded-[100px] ${
        primary
          ? 'text-white bg-brand'
          : 'text-[#1B9B6B] dark:text-[#5BFFC2] border border-[#1B9B6B] dark:border-[#5BFFC2]'
      } ${
        bold
          ? 'text-[16px] xl:text-[18px] h-[41px] font-semibold'
          : 'text-[16px] font-normal h-[48px]'
      }`}
    >
      {label}
    </button>
  );
}

/*
          {
            isFollow
              ? '3xl:pd-[30px] max-h-[48px] min-h-[48px] rounded-[55px] bg-brand px-[16.58px] font-poppins italic text-[16px] text-white dark:bg-[#28C98C]'
              : '3xl:pd-[30px] font-poppins italic max-h-[48px] min-h-[48px] rounded-[55px] border border-[#1B9B6B] text-[16px] dark:border-[#5BFFC2] bg-transparent px-[16.58px] text-[#1B9B6B] dark:text-[#5BFFC2]'
          }

*/

export default function AtuhorsInteractions({ shop }: { shop: Shop }) {
  return (
    <div className="flex gap-[21px] items-center justify-center flex-wrap">
      <button className="h-[48px] w-[48px] flex items-center justify-center border border-brand dark:border-[#5BFFC2] rounded-full">
        <ChatFillIcon className="h-[18px] w-[18px] text-brand" />
      </button>
      <AuthorsButton label="Trade" />

      <div className="flex h-[48px] flex-shrink-0 items-center justify-center">
        <button className="3xl:pd-[30px] font-poppins italic max-h-[48px] min-h-[48px] rounded-[55px] border border-[#1B9B6B] text-[16px] dark:border-[#5BFFC2] bg-transparent px-[16.58px] text-[#1B9B6B] dark:text-[#5BFFC2]">
          {'Follow'}
        </button>
      </div>
    </div>
  );
}
