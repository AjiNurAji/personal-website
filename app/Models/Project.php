<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    protected $casts = [
        'badges' => 'array',
        'featured' => 'boolean',
        'documentation_images' => 'array',
    ];

    public function getTitleAttribute($value): string
    {
        return $this->localizedValue('title', $value);
    }

    public function getDescriptionAttribute($value): string
    {
        return $this->localizedValue('description', $value);
    }

    public function getContentAttribute($value): ?string
    {
        return $this->localizedValue('content', $value);
    }

    private function localizedValue(string $field, mixed $fallback): mixed
    {
        $locale = app()->getLocale();
        return $this->getRawOriginal("{$field}_{$locale}") ?: $fallback;
    }
}
