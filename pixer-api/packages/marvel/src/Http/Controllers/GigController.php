<?php

namespace Marvel\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Marvel\Database\Models\Language;
use Marvel\Database\Models\Package;
use Marvel\Database\Models\Gig;
use Marvel\Database\Models\Follow;
use Marvel\Database\Repositories\GigRepository;
use Marvel\Exceptions\MarvelException;
use Marvel\Http\Requests\GigRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use Illuminate\Support\Facades\DB;

class GigController extends CoreController
{
    public $repository;

    public function __construct(GigRepository $repository)
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
        $limit = $request->limit ? $request->limit : 15;
        return $this->repository->with(['customer', 'profile', 'likes'])->withCount(['likes'])->orderBy('updated_at', 'desc')->paginate($limit)->withQueryString();

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
    public function store(GigRequest $request)
    {
        if ($request->user()) {
            $new_gig = $this->repository->storePost($request);

            foreach ($request->packages as $eachPackage) {
                Package::create(['gig_id' => $new_gig->id, 'title' => $eachPackage['title'], 'name' => $eachPackage['name'], 'price' => $eachPackage['price'], 'descr' => $eachPackage['descr'], 'keywords' => $eachPackage['keywords'], 'delivery' => $eachPackage['delivery'], 'revision' => $eachPackage['revision'], 'additional_banner' => $eachPackage['additional_banner'], 'additional_source' => $eachPackage['additional_source']]);
            }

            return $new_gig;
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
        $ordered_package_ids = DB::table('orders')
            ->join('order_product', 'orders.id', '=', 'order_product.order_id')// joining the contacts table , where user_id and contact_user_id are same
            ->where('orders.parent_id', '!=', 'null')
            ->where('order_product.type', 'package')
            ->select('orders.*', 'order_product.type', 'order_product.product_id')
            ->get()
            ->pluck('product_id')->all();

        $cur_orders_amount = Package::whereIn('id', $ordered_package_ids)->where('gig_id', $id)->get()->count();
        $gig = $this->repository->with(['customer', 'profile', 'packages', 'likes'])->withCount(['likes'])->findOrFail($id);
        $gig->orders_amount = $cur_orders_amount;

        return $gig;
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
