<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->string('title_id')->nullable()->after('title_en');
            $table->text('description_en')->nullable()->after('description');
            $table->text('description_id')->nullable()->after('description_en');
            $table->text('content_en')->nullable()->after('content');
            $table->text('content_id')->nullable()->after('content_en');
            $table->json('documentation_images')->nullable()->after('image');
        });

        Schema::table('achievements', function (Blueprint $table) {
            $table->string('title_en')->nullable()->after('title');
            $table->string('title_id')->nullable()->after('title_en');
            $table->text('description_en')->nullable()->after('description');
            $table->text('description_id')->nullable()->after('description_en');
            $table->text('content_en')->nullable()->after('content');
            $table->text('content_id')->nullable()->after('content_en');
            $table->string('organization_en')->nullable()->after('organization');
            $table->string('organization_id')->nullable()->after('organization_en');
            $table->json('documentation_images')->nullable()->after('preview_image');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'title_id', 'description_en', 'description_id', 'content_en', 'content_id', 'documentation_images']);
        });

        Schema::table('achievements', function (Blueprint $table) {
            $table->dropColumn(['title_en', 'title_id', 'description_en', 'description_id', 'content_en', 'content_id', 'organization_en', 'organization_id', 'documentation_images']);
        });
    }
};
