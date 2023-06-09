<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Models\CommentLike;
use Marvel\Database\Repositories\FeedCommentRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\FeedCommentRequest;
use Prettus\Validator\Exceptions\ValidatorException;

class FeedCommentController extends CoreController
{
    public $repository;

    public function __construct(FeedCommentRepository $repository)
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
        //
        return $this->repository->with(['customer', 'profile'])->all();
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
    public function store(FeedCommentRequest $request)
    {
        if ($request->user()->id == $request->user_id) {
            return $this->repository->storeComment($request);
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
        {
            try {
                $comment = $this->repository->with(['customer', 'profile'])->findOrFail($id);

                $matchThese = ['comment_id' => $comment->id, 'type' => 'feed', 'status' => 1];
                $likes = CommentLike::where($matchThese)->get();
                $comment->likes_count = $likes->count();
                $comment->likes = $likes;

                return $comment;
            } catch (Exception $e) {
                throw new MarvelException(NOT_FOUND);
            }
        }
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
