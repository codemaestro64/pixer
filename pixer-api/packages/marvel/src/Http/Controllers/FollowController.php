<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Repositories\FollowRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\FollowRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use Marvel\Database\Models\Follow;

class FollowController extends CoreController
{
    public $repository;

    public function __construct(FollowRepository $repository)
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
        if ($request->user()->id == $request->sender_user_id) {
            $matchThese = ['sender_user_id' => $request->sender_user_id, 'receiver_user_id' => $request->receiver_user_id];
            $followInfo = Follow::where($matchThese)->first();

            if ($followInfo) {
                return $followInfo;
            } else {
                return response()->json([
                    'sender_user_id' => $request->sender_user_id,
                    'receiver_user_id' => $request->receiver_user_id,
                    'status' => false,
                ]);
            }
        } else {
            throw new MarvelException(NOT_AUTHORIZED);
        }
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
    public function store(FollowRequest $request)
    {
        if ($request->user()->id == $request->sender_user_id) {
            $matchThese = ['sender_user_id' => $request->sender_user_id, 'receiver_user_id' => $request->receiver_user_id];
            $followInfo = Follow::where($matchThese)->first();
            if ($followInfo) {
                $followInfo->status = !$followInfo->status;
                $followInfo->save();
            } else {
                $followInfo = $this->repository->create([
                    'sender_user_id' => $request->sender_user_id,
                    'receiver_user_id' => $request->receiver_user_id,
                    'status' => true,
                ]);
            }

            return $followInfo;
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
