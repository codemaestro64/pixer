<?php

namespace Marvel\Database\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Marvel\Database\Models\Feed;
use Prettus\Validator\Exceptions\ValidatorException;
use Spatie\Permission\Models\Permission;
use Marvel\Enums\Permission as UserPermission;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use Marvel\Mail\ForgetPassword;
use Illuminate\Support\Facades\Mail;
use Marvel\Database\Models\Address;
use Marvel\Database\Models\Profile;
use Marvel\Database\Models\Shop;
use Marvel\Database\Models\User;
use Marvel\Exceptions\MarvelException;

class FeedRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descr' => 'like',
    ];

    protected $dataArray = [
        'user_id',
        'descr',
        'content',
        'type',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Feed::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeFeed($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $feed = $this->create($data);

            $feed->save();
            return $feed;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

    public function updateFeed($request, $id) {
        try {
            $feed = $this->findOrFail($id);
            $feed->update($request->only($this->dataArray));

            return $feed;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

}
