<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id'); //->after('id');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->nullable();
            $table->string('description');
            $table->string('cover_image');
            $table->string('logo');
            $table->boolean('is_active');
            $table->boolean('is_private');
            $table->timestamps();
        });

        Schema::create('communities_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('community_id'); //->after('id');
            $table->foreign('community_id')->references('id')->on('communities')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('user_id'); //->after('community_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });

        Schema::create('communities_posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('community_id'); //->after('id');
            $table->foreign('community_id')->references('id')->on('communities')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('owner_id'); //->after('community_id');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('post');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('communities_users');
        Schema::dropIfExists('communities_posts');
        Schema::dropIfExists('communities');
    }
}
