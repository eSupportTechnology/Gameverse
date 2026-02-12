<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    protected $fillable = [
        'name',
        'type',
        'location',
        'description',
        'price',
        'status',
        'bookings',
        'time',
        'vrTime',
        'vrPrice',
        'thumbnail',
        'common_thumbnail'
    ];

    // Automatically append these fields to JSON
    protected $appends = [
        'thumbnail_url',
        'common_thumbnail_url'
    ];

    /*
    |--------------------------------------------------------------------------
    | Thumbnail URL
    |--------------------------------------------------------------------------
    */
    public function getThumbnailUrlAttribute()
    {
        if (!$this->thumbnail) {
            return null;
        }

        $adminBaseUrl = rtrim(config('app.admin_base_url'), '/');

        return $adminBaseUrl . '/storage/' . $this->thumbnail;
    }

    /*
    |--------------------------------------------------------------------------
    | Common Thumbnail URL
    |--------------------------------------------------------------------------
    */
    public function getCommonThumbnailUrlAttribute()
    {
        if (!$this->common_thumbnail) {
            return null;
        }

        $adminBaseUrl = rtrim(config('app.admin_base_url'), '/');

        return $adminBaseUrl . '/storage/' . $this->common_thumbnail;
    }
}
