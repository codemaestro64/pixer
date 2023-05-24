<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Repositories\CommentLikeRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\CommentLikeRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use Marvel\Database\Models\CommentLike;

class CommentLikeController extends CoreController
{
    public $repository;

    public function __construct(CommentLikeRepository $repository)
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
    public function store(CommentLikeRequest $request)
    {
        if ($request->user()->id == $request->user_id) {
            $matchThese = ['comment_id' => $request->comment_id, 'user_id' => $request->user_id, 'type' => $request->type];
            $commentLike = CommentLike::where($matchThese)->first();

            if ($commentLike) {
                $commentLike->status = !$commentLike->status;
                $commentLike->save();
            } else {
                $commentLike = $this->repository->create([
                    'user_id'     => $request->user_id,
                    'comment_id'    => $request->comment_id,
                    'type' => $request->type,
                    'status' => true,
                ]);
            }

            return $commentLike;
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
