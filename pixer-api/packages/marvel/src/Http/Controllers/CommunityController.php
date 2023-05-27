<?php 

namespace Marvel\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Marvel\Enums\Permission;
use Marvel\Exceptions\MarvelException;
use Marvel\Database\Models\Community;
use Marvel\Http\Requests\CommunityCreateRequest;
use Marvel\Http\Requests\CommunityUpdateRequest;
use Marvel\Database\Repositories\CommunityRepository;

class CommunityController extends CoreController 
{
	public $repository;

	public function __construct(CommunityRepository $repository)
	{
		$this->repository = $repository;
	}

	/**
     * Display a listing of of communities
     *
     * @param Request $request
     * @return Collection|Community[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 15;
        return $this->fetchCommunities($request)->paginate($limit)->withQueryString();
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function fetchCommunities(Request $request)
    {
        $language = $request->language ?? DEFAULT_LANGUAGE;
        return $this->repository->withCount(['members'])->where('id', '!=', null);
    }


    /**
     * Display the specified community.
     *
     * @param $slug
     * @param Request $request
     * @return JsonResponse
     * @throws MarvelException
     */
    public function show($slug, Request $request) 
    {
        $community = $this->repository->withCount(['members']);
            //->with(['owner']);
            //>withCount(['members']);

        try {
            $community = $community->findOneByFieldOrFail('slug', $slug);
            return $community;
        } catch (\Exception $e) {
            throw new MarvelException(NOT_FOUND);
        }
    }

     /**
     * Store a newly created community in storage.
     *
     * @param CommunityreateRequest $request
     * @return mixed
     * @throws MarvelException
     */
    public function store(CommunityCreateRequest $request)
    {
        
    }

}