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
use Marvel\Database\Models\Follow;
use Marvel\Exceptions\MarvelException;

class FollowRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $dataArray = [
        'sender_user_id',
        'receiver_user_id',
        'status',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Follow::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeFollow($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $followInfo = $this->create($data);

            $followInfo->save();
            return $followInfo;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

    public function updateFollow($request, $id) {
        try {
            $followInfo = $this->findOrFail($id);
            $followInfo->update($request->only($this->dataArray));

            return $followInfo;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }
}
