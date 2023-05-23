<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Repositories\PostLikeRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\PostLikeRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use Marvel\Database\Models\PostLike;

class PostLikeController extends CoreController
{
    public $repository;

    public function __construct(PostLikeRepository $repository)
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
    public function store(PostLikeRequest $request)
    {
        if ($request->user()->id == $request->user_id) {
            $postLike = PostLike::where('post_id', $request->post_id)->where('user_id', $request->user_id)->first();
            if ($postLike) {
                $postLike->status = !$postLike->status;
                $postLike->save();
            } else {
                $postLike = $this->repository->create([
                    'user_id'     => $request->user_id,
                    'post_id'    => $request->post_id,
                    'status' => true,
                ]);
            }

            return $postLike;
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
