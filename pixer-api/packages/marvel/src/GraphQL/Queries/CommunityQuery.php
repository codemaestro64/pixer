<?php


namespace Marvel\GraphQL\Queries;


use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Marvel\Facades\Community;

class CommunityQuery
{
    public function fetchCommunities($rootValue, array $args, GraphQLContext $context)
    {
        return Community::call('Marvel\Http\Controllers\CommunityController@fetchCommunities', $args);
    }
}
