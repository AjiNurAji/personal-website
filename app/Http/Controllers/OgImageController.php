<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Intervention\Image\ImageManager;
use Intervention\Image\Typography\FontFactory;

class OgImageController extends Controller
{
    public function __invoke(Request $request)
    {
        $title = $request->query('title', Setting::getValue('site_title', 'Aji Nur Aji'));
        $desc  = $request->query('description', Setting::getValue('site_description', 'Fullstack Developer & Portfolio'));

        $cacheKey = 'og_image_' . md5($title . $desc);

        $png = Cache::remember($cacheKey, now()->addHours(6), function () use ($title, $desc) {
            return $this->render($title, $desc);
        });

        return response($png, 200)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'public, max-age=21600');
    }

    private function render(string $title, string $desc): string
    {
        $manager = new ImageManager(['driver' => 'gd']);
        $w = 1200;
        $h = 630;

        $img = $manager->create($w, $h)->fill('#0a0a14');

        // Gradient accent — draw thin horizontal lines at varying opacity
        for ($y = 0; $y < $h; $y++) {
            $alpha = ($h - $y) / $h * 0.08;
            if ($alpha > 0) {
                $r = (int)(80 * $alpha * 15);
                $g = (int)(40 * $alpha * 15);
                $b = (int)(150 * $alpha * 15);
                $img->drawRectangle(0, $y, function ($d) use ($r, $g, $b) {
                    $d->size($d->width(), 1);
                    $d->background("rgb({$r},{$g},{$b})");
                });
            }
        }

        // Purple accent circle top-right
        $img->drawEllipse($w + 100, -100, 400, 400, function ($d) {
            $d->background('rgba(100, 50, 180, 0.12)');
            $d->border('transparent', 0);
        });

        // Accent line
        $img->drawRectangle(80, 195, function ($d) {
            $d->size(320, 4);
            $d->background('#6c5ce7');
        });

        // Title text
        $img->text($title, 80, 280, function (FontFactory $font) {
            $font->filename($this->fontPath('bold'));
            $font->size(52);
            $font->color('#f0f0ff');
        });

        // Description
        if ($desc) {
            $img->text($desc, 80, 370, function (FontFactory $font) {
                $font->filename($this->fontPath('regular'));
                $font->size(28);
                $font->color('#8888aa');
            });
        }

        // Bottom-right brand
        $img->text('ajinuraji.my.id / Fullstack Developer', $w - 80, $h - 60, function (FontFactory $font) {
            $font->filename($this->fontPath('regular'));
            $font->size(16);
            $font->color('#505060');
            $font->align('right');
        });

        // "AJ" logo circle top-right
        $s = 100;
        $cx = $w - 120;
        $cy = 90;
        $img->drawEllipse($cx, $cy, $s, $s, function ($d) {
            $d->background('#1a1a30');
            $d->border('#6c5ce7', 2);
        });

        return (string) $img->encodeByExtension('png', quality: 90);
    }

    private function fontPath(string $weight): string
    {
        // Try project fonts first, fall back to system
        $local = [
            'bold'    => public_path('fonts/Inter-Bold.ttf'),
            'regular' => public_path('fonts/Inter-Regular.ttf'),
        ];

        if (isset($local[$weight]) && file_exists($local[$weight])) {
            return $local[$weight];
        }

        // Windows system fonts
        $system = [
            'bold'    => 'C:/Windows/Fonts/arialbd.ttf',
            'regular' => 'C:/Windows/Fonts/arial.ttf',
        ];

        return $system[$weight] ?? $system['regular'];
    }
}
