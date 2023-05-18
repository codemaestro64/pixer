<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Repositories\FeedRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\FeedRequest;
use Prettus\Validator\Exceptions\ValidatorException;

class FeedController extends CoreController
{
    public $repository;

    public function __construct(FeedRepository $repository)
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
        return $this->repository->with(['customer', 'profile', 'likes'])->withCount(['comments', 'likes'])->orderBy('updated_at', 'desc')->get();
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
    public function store(FeedRequest $request)
    {
        if ($request->user()->id == $request->user_id) {
            if ($request->id) {
                $id =  $request->id;
                return $this->repository->updateFeed($request, $id);
            } else {
                return $this->repository->storeFeed($request);
            }
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
                return $this->repository->with(['customer', 'profile', 'likes', 'comments'])->withCount(['comments', 'likes'])->findOrFail($id);
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
