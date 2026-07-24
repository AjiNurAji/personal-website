<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OgImageController extends Controller
{
    public function __invoke(Request $request)
    {
        $title = $request->query('title') ?: Setting::getValue('site_title') ?: 'Aji Nur Aji';
        $desc  = $request->query('description') ?: Setting::getValue('site_description') ?: 'Fullstack Developer & Portfolio';

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
        $w = 1200;
        $h = 630;

        $img = imagecreatetruecolor($w, $h);
        if (!$img) {
            throw new \RuntimeException('GD imagecreatetruecolor failed');
        }

        // Dark background
        $bg = imagecolorallocate($img, 10, 10, 20);
        imagefill($img, 0, 0, $bg);

        // Purple accent circle top-right
        $circle = imagecolorallocatealpha($img, 100, 50, 180, 105);
        imagefilledellipse($img, $w + 100, -100, 500, 500, $circle);

        // Accent line
        $accent = imagecolorallocate($img, 108, 92, 231);
        imagefilledrectangle($img, 80, 195, 400, 199, $accent);

        // Colors
        $white = imagecolorallocate($img, 240, 240, 255);
        $muted = imagecolorallocate($img, 136, 136, 170);
        $dim   = imagecolorallocate($img, 80, 80, 96);

        // Font
        $font = $this->findFont();
        if ($font) {
            imagettftext($img, 48, 0, 80, 270, $white, $font, $this->truncate($title, 48, 1000));
            if ($desc) {
                imagettftext($img, 24, 0, 80, 350, $muted, $font, $this->truncate($desc, 24, 950));
            }
            imagettftext($img, 14, 0, 820, $h - 40, $dim, $font, 'ajinuraji.my.id');
        } else {
            imagestring($img, 5, 80, 270, $this->truncate($title, 48, 1000), $white);
            if ($desc) {
                imagestring($img, 4, 80, 350, $this->truncate($desc, 24, 950), $muted);
            }
            imagestring($img, 2, 820, $h - 40, 'ajinuraji.my.id', $dim);
        }

        ob_start();
        imagepng($img, null, 5);
        $data = ob_get_clean();
        imagedestroy($img);

        return $data;
    }

    private function findFont(): ?string
    {
        $paths = [
            public_path('fonts/Inter-Bold.ttf'),
            public_path('fonts/Inter-Regular.ttf'),
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/TTF/DejaVuSans-Bold.ttf',
            '/usr/share/fonts/TTF/DejaVuSans.ttf',
        ];

        foreach ($paths as $path) {
            if (file_exists($path)) {
                return $path;
            }
        }

        return null;
    }

    private function truncate(string $text, int $size, int $maxWidth): string
    {
        // Rough char-based truncation for when no font available
        $maxChars = (int)($maxWidth / ($size * 0.55));
        if (mb_strlen($text) <= $maxChars) {
            return $text;
        }
        return mb_substr($text, 0, $maxChars - 1) . '…';
    }
}
