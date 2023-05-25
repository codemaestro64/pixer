<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\hasManyThrough;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Post extends Model
{
    protected $table = 'posts';

    protected $fillable = [
        'user_id', 'title', 'categories', 'sub_categories', 'descr', 'keywords', 'attachments'
    ];

    protected $casts = [
        'attachments'   => 'json',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'customer_id', 'user_id');
    }

    public function packages(): HasMany
    {
        return $this->hasMany(Package::class)->orderBy('updated_at', 'desc');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(PostComment::class)->orderBy('updated_at', 'desc');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(PostLike::class)->where('status', '=', 1);
    }

    public function followers(): HasMany {
        return $this->hasMany(Follow::class, 'receiver_user_id', 'user_id')->where('status', 1);
    }
}
