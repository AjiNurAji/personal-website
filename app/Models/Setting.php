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
}
