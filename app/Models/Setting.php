<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function getValue($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        if (!$setting) return $default;

        $value = $setting->value;
        // Check if it's JSON
        $decoded = json_decode($value, true);
        return (json_last_error() == JSON_ERROR_NONE) ? $decoded : $value;
    }

    public static function publicValues(): array
    {
        return self::query()
            ->whereNotIn('key', ['github_token'])
            ->pluck('value', 'key')
            ->toArray();
    }

    public static function localizedPublicValues(?string $locale = null): array
    {
        $values = self::publicValues();
        $locale ??= app()->getLocale();

        foreach ($values as $key => $value) {
            if (!str_ends_with($key, '_en') && !str_ends_with($key, '_id')) {
                continue;
            }

            $baseKey = substr($key, 0, -3);
            $activeKey = $baseKey.'_'.$locale;

            if (array_key_exists($activeKey, $values) && $values[$activeKey] !== null && $values[$activeKey] !== '') {
                $values[$baseKey] = $values[$activeKey];
            }
        }

        return $values;
    }
}
