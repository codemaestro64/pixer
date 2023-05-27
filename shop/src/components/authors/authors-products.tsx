import React, { useState, useEffect } from 'react';
import { AuthorsButton } from './authors-interactions';
import { FilterIcon } from '../icons/filter-icon';
import { EllipsisVerticalIcon } from '../icons/ellipsis-vertical-icon';
import AuthorProduct from './author-product';
import { User } from '@/types';
import client from '@/data/client';
import { useMutation } from 'react-query';
import type { Post, PostByUserQueryOptions, Shop } from '@/types';
import GridPosts from '@/components/post/grid';
import GridProducts from '@/components/product/grid';
import { useProducts } from '@/data/product';

function MenuButton({ icon }: { icon: React.ReactElement }) {
  const additionalClasses = icon.props?.className || '';
  return (
    <button className="text-[#C1C1C1] dark:text-white">
      {React.cloneElement(icon, {
        className: 'w-[28px] h-[28px] ' + additionalClasses,
      })}
    </button>
  );
}

function AuthorsProductButton({
  label,
  active,
  toggleAction,
}: {
  label: string;
  active: boolean;
  toggleAction: any;
}) {
  return (
    <button
      onClick={toggleAction}
      className={`min-w-[120px] max-w-[180px] px-[35px] font-poppins rounded-[100px] text-[16px] xl:text-[18px] h-[41px] font-semibold ${
        active
          ? 'text-white bg-brand'
          : 'text-[#9D9D9D] dark:text-[#434343] rounded-[100px]'
      }`}
    >
      {label}
    </button>
  );
}

export default function AuthorsProducts({ shop }: { shop: Shop }) {
  const [selectedType, setSelectedType] = useState<boolean>(true);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [params, setParams] = useState<PostByUserQueryOptions>({
    user_id: shop.owner.id,
    page: 1,
    limit: 30,
  });

  const {
    products,
    isLoading: isLoadingProducts,
    loadMore: loadMoreProducts,
    isLoadingMore: isLoadingMoreProducts,
    hasNextPage: hasNextPageProducts,
  } = useProducts({
    shop_id: shop.id,
  });

  const onClicedProductType = (bValue: boolean) => {
    setSelectedType(bValue);
  };

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
          <AuthorsProductButton
            label="Products"
            active={selectedType}
            toggleAction={() => onSetViewType(true)}
          />
          <AuthorsProductButton
            label="Posts"
            active={!selectedType}
            toggleAction={() => onSetViewType(false)}
          />
        </div>
        <div className="ml-auto flex gap-[10px] xl:gap-[42px] mr-[30px]">
          <MenuButton icon={<FilterIcon />} />
          <MenuButton icon={<EllipsisVerticalIcon className="rotate-90" />} />
        </div>
      </div>
      {/* products */}
      <div className="">
        {selectedType ? (
          <GridProducts
            products={products}
            isLoading={isLoadingProducts}
            onLoadMore={loadMoreProducts}
            isLoadingMore={isLoadingMoreProducts}
            hasNextPage={hasNextPageProducts}
          />
        ) : (
          <GridPosts
            posts={posts}
            limit={30}
            onLoadMore={loadMore}
            hasNextPage={hasNextPage}
            isLoadingMore={isLoading}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
