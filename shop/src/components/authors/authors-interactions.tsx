import { useEffect, useState } from 'react';
import { ChatFillIcon } from '../icons/chat-fill-icon';
import { Follow, Shop, User } from '@/types';
import { SpinnerIcon } from '../icons/spinner-icon';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useMe } from '@/data/user';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import client from '@/data/client';

export default function AtuhorsInteractions({ shop }: { shop: Shop }) {
  const queryClient = useQueryClient();
  const { isAuthorized, isLoading, me } = useMe();
  const { data: isShopFollowed, isLoading: isLoadingFollowStatus } = useQuery(
    [API_ENDPOINTS.FOLLOW_SHOP, shop.id],
    () => client.follow.isShopFollowed({ shop_id: shop.id }),
    {
      enabled: isAuthorized,
    }
  );

  const { mutate: toggleFollow, isLoading: isLoadingFollow } = useMutation(
    client.follow.toggle,
    {
      onSettled: () => {
        queryClient.invalidateQueries([API_ENDPOINTS.FOLLOW_SHOP, shop.id]);
        queryClient.invalidateQueries([API_ENDPOINTS.FOLLOWED_SHOPS]);
      },
    }
  );

  function handleToggleFollow(e: any) {
    e.stopPropagation();
    toggleFollow({
      shop_id: shop.id,
    });
  }
  return (
    <div className="flex gap-[21px] items-center justify-center flex-wrap">
      <button className="h-[48px] w-[48px] flex items-center justify-center border border-brand dark:border-[#5BFFC2] rounded-full">
        <ChatFillIcon className="h-[18px] w-[18px] text-brand" />
      </button>
      <button className="min-w-[120px] px-[35px] font-poppins rounded-[100px] text-[#1B9B6B] dark:text-[#5BFFC2] border border-[#1B9B6B] dark:border-[#5BFFC2] text-[16px] font-normal h-[48px]">
        {'Trade'}
      </button>
      {isAuthorized && (
        <div className="flex h-[48px] flex-shrink-0 items-center justify-center">
          <button
            onClick={handleToggleFollow}
            className={
              isShopFollowed
                ? '3xl:pd-[30px] max-h-[48px] min-h-[48px] rounded-[55px] bg-brand px-[16.58px] font-poppins italic text-[16px] text-white dark:bg-[#28C98C]'
                : '3xl:pd-[30px] font-poppins italic max-h-[48px] min-h-[48px] rounded-[55px] border border-[#1B9B6B] text-[16px] dark:border-[#5BFFC2] bg-transparent px-[16.58px] text-[#1B9B6B] dark:text-[#5BFFC2]'
            }
          >
            {(isLoadingFollowStatus || isLoadingFollow) && (
              <SpinnerIcon className="h-auto w-5 animate-spin" />
            )}
            {!(isLoadingFollowStatus || isLoadingFollow) &&
              (isShopFollowed ? 'UnFollow' : 'Follow')}
          </button>
        </div>
      )}
    </div>
  );
}
