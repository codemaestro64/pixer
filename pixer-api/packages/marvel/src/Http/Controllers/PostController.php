<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Models\Package;
use Marvel\Database\Models\Follow;
use Marvel\Database\Repositories\PostRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\PostRequest;
use Prettus\Validator\Exceptions\ValidatorException;

class PostController extends CoreController
{
    public $repository;

    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //return $this->repository->with(['customer', 'profile', 'packages'])->where('user_id', $request->user()->id)->orderBy('updated_at', 'desc')->get();
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['customer', 'profile', 'packages', 'likes', 'followers'])->withCount(['comments', 'likes', 'followers'])->orderBy('updated_at', 'desc')->paginate($limit);

    }

    public function getPostsByUser(Request $request) {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['customer', 'profile', 'packages', 'likes', 'followers'])->withCount(['comments', 'likes', 'followers'])->where('user_id', $request->user_id)->orderBy('updated_at', 'desc')->paginate($limit);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        if ($request->user()) {
            $new_post = $this->repository->storePost($request);

            foreach ($request->packages as $eachPackage) {
                Package::create(['post_id' => $new_post->id, 'name' => $eachPackage['name'], 'price' => $eachPackage['price'], 'descr' => $eachPackage['descr'], 'keywords' => $eachPackage['keywords']]);
            }

            return $new_post;
        } else {
            throw new MarvelException(NOT_AUTHORIZED);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = $this->repository->with(['customer', 'profile', 'packages', 'likes', 'comments', 'followers'])->withCount(['comments', 'followers', 'likes'])->findOrFail($id);

        $latest_posts_ids = $this->repository->where('id', '!=', $id)->orderBy('updated_at', 'desc')->offset(0)->limit(10)->pluck('id')->all();
        $latest_posts = $this->repository->with(['customer', 'profile', 'packages', 'likes', 'comments', 'followers'])->withCount(['comments', 'followers', 'likes'])->whereIn('id', $latest_posts_ids)->orderBy('updated_at', 'desc')->get();

        /*
        $followers_cnt = Follow::where('receiver_user_id', $post->user_id)->where('status', 1)->get()->count();
        $post->followers_count = $followers_cnt;
        */

        return response()->json([
            'post' => $post,
            'latest_posts' => $latest_posts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
