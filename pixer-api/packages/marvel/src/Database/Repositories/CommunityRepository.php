<?php 

namespace Marvel\Database\Repositories;

use Marvel\Database\Models\Community;
use Marvel\Enums\Permission;
use Marvel\Exceptions\MarvelException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Prettus\Validator\Exceptions\ValidatorException;

class CommunityRepository extends BaseRepository
{
	/**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        'is_active'
    ];

    /**
     * @var array
     */
    protected $dataArray = [
        'name',
        'description',
        'cover_image',
        'logo',
        'is_active',
        'is_private'
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
            //
        }
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Community::class;
    }

    public function storeCommunity($request)
    {
    	try {
    		$data = $request->only($this->dataArray);
    		$data['owner_id'] = $request->user()->id;
    		$community = $this->create($data);

    		return $community;
    	} catch (ValidatorException $e) {
    		throw new MarvelException(SOMETHING_WENT_WRONG);
    	}
    }
}