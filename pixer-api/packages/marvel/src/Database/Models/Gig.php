<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\hasManyThrough;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Gig extends Model
{
    protected $table = 'gigs';

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

    public function likes(): HasMany
    {
        return $this->hasMany(GigLike::class)->where('status', '=', 1);
    }

}
