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
use Marvel\Database\Models\FeedComment;
use Marvel\Exceptions\MarvelException;

class FeedCommentRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'reply' => 'like',
    ];

    protected $dataArray = [
        'user_id',
        'feed_id',
        'reply',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return FeedComment::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeComment($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $comment = $this->create($data);

            $comment->save();

            $comment->likes_count = 0;
            return $comment;
        } catch (ValidatorException $e) {
            throw new MarvelException(SOMETHING_WENT_WRONG);
        }
    }

}
