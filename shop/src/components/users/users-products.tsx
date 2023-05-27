import React, { useState, useEffect } from 'react';
import { FilterIcon } from '../icons/filter-icon';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';
import { User } from '@/types';
import client from '@/data/client';
import { useMutation } from 'react-query';
import type { Post, PostByUserQueryOptions } from '@/types';
import GridPosts from '@/components/post/grid';
import GridProducts from '@/components/product/grid';
import { useProducts } from '@/data/product';
import {
  ProfileMenuButton,
  ProfilePostProductButton,
} from '../profile/profile-buttons';

export default function UserProducts({ user }: { user: User }) {
  const [selectedType, setSelectedType] = useState<boolean>(true);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [params, setParams] = useState<PostByUserQueryOptions>({
    user_id: user.id,
    page: 1,
    limit: 30,
  });

  const { mutate: mutatePosts, isLoading } = useMutation(
    client.posts.allByUsers,
    {
      onSuccess: (res) => {
        if (res.current_page === res.last_page) {
          setHasNextPage(false);
        } else {
          setHasNextPage(true);
          setParams({ ...params, page: params.page! + 1 });
        }
        setPosts([...posts, ...res.data]);
      },
      onError: (err: any) => {
        console.log(err.response.data, 'error');
      },
    }
  );

  useEffect(() => {
    mutatePosts(params);
  }, []);

  const loadMore = () => {
    mutatePosts(params);
  };

  const onSetViewType = (bType: boolean) => {
    setSelectedType(bType);
  };

  return (
    <div className="px-[0px] sm:px-[20px] xl:px-[16.5px] py-[10px] pt-[20px] xl:pt-[10px] bg-white dark:bg-[#292929] xl:rounded-[15px]">
      {/* buttons */}
      <div className="pl-[16px] sm:pl-[32px] xl:pt-[14px] flex items-center">
        <div className="flex items-center gap-[2px] sm:gap-[23px]">
          <ProfilePostProductButton
            label="Posts"
            active={true}
            toggleAction={() => onSetViewType(true)}
          />
        </div>
        <div className="ml-auto flex gap-[10px] xl:gap-[42px] mr-[30px]">
          <ProfileMenuButton icon={<FilterIcon />} />
          <ProfileMenuButton
            icon={<EllipsisVerticalIcon className="rotate-90" />}
          />
        </div>
      </div>
      {/* products */}
      <div className="">
        <GridPosts
          posts={posts}
          limit={30}
          onLoadMore={loadMore}
          hasNextPage={hasNextPage}
          isLoadingMore={isLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
