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
        Schema::table('reviews', function (Blueprint $table) {
            $table->boolean('now_playing')->default(false);
            $table->boolean('from_the_blog')->default(false);
            $table->boolean('review_collections')->default(false);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn('now_playing');
            $table->dropColumn('from_the_blog');
            $table->dropColumn('review_collections');
        });
    }
};
