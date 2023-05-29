<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Repositories\GigLikeRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\GigLikeRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use Marvel\Database\Models\GigLike;

class GigLikeController extends CoreController
{
    public $repository;

    public function __construct(GigLikeRepository $repository)
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
    public function store(GigLikeRequest $request)
    {
        if ($request->user()->id == $request->user_id) {
            $gigLike = GigLike::where('gig_id', $request->gig_id)->where('user_id', $request->user_id)->first();
            if ($gigLike) {
                $gigLike->status = !$gigLike->status;
                $gigLike->save();
            } else {
                $gigLike = $this->repository->create([
                    'user_id'     => $request->user_id,
                    'gig_id'    => $request->gig_id,
                    'status' => true,
                ]);
            }

            return $gigLike;
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
