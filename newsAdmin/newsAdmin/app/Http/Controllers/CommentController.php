<?php

namespace App\Http\Controllers;

use App\Models\CineComment;
use App\Models\Comment;
use App\Models\CommentTech;
use App\Models\HealthComment;
use App\Models\SportsComment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'review_id' => 'required|exists:reviews,id',
            'comments' => 'required|string',
        ]);

        $comment = Comment::create($request->all());

        return response()->json($comment, 201);
    }

    public function storeComm(Request $request)
    {
        $request->validate([
            'technology_id' => 'required|exists:technologies,id',
            'comment' => 'required|string',
        ]);

        $comment = CommentTech::create($request->all());
        return response()->json($comment, 201);
    }

    public function storeSports(Request $request)
    {
        $request->validate([
            'sports_id' => 'required|exists:sports,id',
            'comments' => 'required|string',
        ]);

        $comment = SportsComment::create($request->all());
        return response()->json($comment, 201);
    }


    public function storeHealth(Request $request)
    {
        $request->validate([
            'health_id' => 'required|exists:healths,id',
            'comments' => 'required|string',
        ]);

        $comment = HealthComment::create($request->all());

        return response()->json($comment, 201);
    }

    public function storeCinema(Request $request)
    {
        $validatedData = $request->validate([
            'news_id' => 'required|exists:news,id',
            'comment' => 'required|string',
        ]);

        $comment = CineComment::create($validatedData);

        return response()->json($comment, 201);
    }
}
