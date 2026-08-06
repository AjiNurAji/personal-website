<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $guarded = [];

    protected $casts = [
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

    public function getOrganizationAttribute($value): ?string
    {
        return $this->localizedValue('organization', $value);
    }

    private function localizedValue(string $field, mixed $fallback): mixed
    {
        $locale = app()->getLocale();
        return $this->getRawOriginal("{$field}_{$locale}") ?: $fallback;
    }
}
