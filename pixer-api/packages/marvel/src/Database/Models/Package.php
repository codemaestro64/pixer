<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\hasManyThrough;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Package extends Model
{
    protected $table = 'packages';

    protected $fillable = [
        'gig_id', 'title', 'name', 'price', 'descr', 'keywords', 'delivery', 'revision', 'additional_banner', 'additional_source'
    ];

    public function gig(): BelongsTo
    {
        return $this->belongsTo(Gig::class, 'gig_id');
    }
}
