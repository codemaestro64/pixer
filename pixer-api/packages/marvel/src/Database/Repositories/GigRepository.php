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
use Marvel\Database\Models\Gig;
use Marvel\Database\Models\Package;
use Marvel\Exceptions\MarvelException;

class GigRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'title' => 'like',
        'descr' => 'like',
    ];

    protected $dataArray = [
        'user_id',
        'title',
        'categories',
        'sub_categories',
        'descr',
        'keywords',
        'attachments',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Gig::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storePost($request)
    {
        try {
            $user = $request->user();
            $data = $request->only($this->dataArray);
            $data['user_id'] = $user->id;
            $gig = $this->create($data);

            $gig->save();
            return $gig;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

}
