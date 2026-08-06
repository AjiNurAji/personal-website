<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title',
        'title_en',
        'title_id',
        'company',
        'company_en',
        'company_id',
        'location',
        'type',
        'description',
        'description_en',
        'description_id',
        'start_date',
        'end_date',
        'logo',
        'documentation_images',
        'url',
        'priority',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'priority' => 'integer',
        'documentation_images' => 'array',
    ];
}
