<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Models\Package;
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
        return $this->repository->with(['customer', 'profile', 'packages', 'likes'])->withCount(['comments', 'likes'])->orderBy('updated_at', 'desc')->paginate($limit);

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
        return $this->repository->with(['customer', 'profile', 'packages', 'likes', 'comments'])->withCount(['comments', 'likes'])->findOrFail($id);

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
