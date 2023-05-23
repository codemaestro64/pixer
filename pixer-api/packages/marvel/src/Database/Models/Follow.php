<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Follow extends Model
{
    protected $table = 'follows';

    protected $fillable = [
        'sender_user_id', 'receiver_user_id', 'status'
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_user_id');
    }

    public function sender_profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'customer_id', 'sender_user_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_user_id');
    }

    public function receiver_profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'customer_id', 'receiver_user_id');
    }


}
