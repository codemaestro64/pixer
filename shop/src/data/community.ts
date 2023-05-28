import type {
	Community,
	CommunityPaginator,
	CommunityQueryOptions,
} from '@/types';
import { useInfiniteQuery, useQuery } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import client from '@/data/client';
import { isQueryKey } from 'react-query/types/core/utils';

export function useCommunities(options?: CommunityQueryOptions) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<CommunityPaginator, Error>(
    [API_ENDPOINTS.ORDERS, options],
    ({ queryKey, pageParam }) =>
      client.communities.all(Object.assign({}, queryKey[1], pageParam)),
    {
      getNextPageParam: ({ current_page, last_page }) =>
        last_page > current_page && { page: current_page + 1 },
    }
  );
  function handleLoadMore() {
    fetchNextPage();
  }
  return {
    communities: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    error,
    hasNextPage,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
  };
}

export function useCommunity(slug: string) {
	const { data, isLoading, error } = useQuery<Community, Error>(
		[API_ENDPOINTS.COMMUNITIES, slug],
		() => client.communities.get(slug)
	); 

	return {
		community: data,
		isLoading,
		error,
	};
}