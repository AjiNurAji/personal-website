<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            if (!Schema::hasColumn('achievements', 'content')) {
                $table->text('content')->nullable()->after('description');
            }
            if (!Schema::hasColumn('achievements', 'category')) {
                $table->enum('category', ['event', 'award', 'certification'])->default('event')->after('year');
            }
            if (!Schema::hasColumn('achievements', 'certificate_path')) {
                $table->string('certificate_path')->nullable()->after('category');
            }
            if (!Schema::hasColumn('achievements', 'preview_image')) {
                $table->string('preview_image')->nullable()->after('certificate_path');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            $table->dropColumn(['content', 'category', 'certificate_path', 'preview_image']);
        });
    }
};
