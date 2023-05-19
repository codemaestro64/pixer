<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\hasManyThrough;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Feed extends Model
{
    protected $table = 'feeds';

    protected $fillable = [
        'user_id', 'type', 'descr', 'content'
    ];

    protected $casts = [
        'content'   => 'json',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'customer_id', 'user_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->orderBy('updated_at', 'desc');
    }

    public function likes(): HasMany
    {
        return $this->hasMany(FeedLike::class)->where('status', '=', 1);
    }
}
