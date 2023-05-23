<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PostLike extends Model
{
    protected $table = 'post_likes';

    protected $fillable = [
        'user_id', 'post_id', 'status'
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'customer_id', 'user_id');
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Feed::class, 'post_id');
    }
}
