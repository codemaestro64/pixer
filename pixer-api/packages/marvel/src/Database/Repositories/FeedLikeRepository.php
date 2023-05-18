<?php

namespace Marvel\Database\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Marvel\Database\Models\User;
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
use Marvel\Database\Models\FeedLike;
use Marvel\Exceptions\MarvelException;

class FeedLikeRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $dataArray = [
        'user_id',
        'feed_id',
        'status',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return FeedLike::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeLike($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $feedLike = $this->create($data);

            $feedLike->save();
            return $feedLike;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

    public function updateLike($request, $id) {
        try {
            $feedLike = $this->findOrFail($id);
            $feedLike->update($request->only($this->dataArray));

            return $feedLike;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }
}
