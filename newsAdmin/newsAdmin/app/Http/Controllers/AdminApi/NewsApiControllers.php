<?php
namespace App\Http\Controllers\AdminApi;

use App\Http\Controllers\Controller;
use App\Models\Health;
use App\Models\News;
use App\Models\Review;
use App\Models\Sports;
use App\Models\Technology;
use Illuminate\Http\Request;

class NewsApiControllers extends Controller
{
    public function fetchAllCinemaNews()
    {
        $news = News::orderBy('created_at', 'desc')->get();
        return response()->json($news);
    }

    public function fetchAllSportsNews()
    {
        $sportsNews = Sports::orderBy('created_at', 'desc')->get();
        return response()->json($sportsNews);
    }

    public function fetchCinemaNewsBySlug($slug)
{
    $news = News::where('slug', $slug)->first();
    if (!$news) {
        return response()->json(['error' => 'News not found.'], 404);
    }
    return response()->json($news);
}

    

    public function fetchSportsNewsBySlug($slug)
    {
        $sportsNews = Sports::where('slug', $slug)->first();
        return response()->json($sportsNews);
    }

    public function fetchAllTechnologyNews()
    {
        $technology = Technology::orderBy('created_at', 'desc')->get();
        return response()->json($technology);
    }

    public function fetchTechnologyNewsBySlug($slug)
    {
        $technology = Technology::where('slug', $slug)->first();
        if (!$technology) 
        {
            return response()->json(['error' => 'News not found.'], 404);
        }
        return response()->json($technology);
    }

    public function fetchAllReviews()
    {
        $review = Review::orderBy('created_at', 'desc')->get();
        return response()->json($review);
    }

    public function fetchAllHealth()
    {
        $health = Health::orderBy('created_at', 'desc')->get();
        return response()->json($health);
    }

    public function fetchAllReviewsById($slug)
    {
        $review = Review::where('slug',$slug)->first();

        
        return response()->json($review);
    }

    public function fetchAllHealthById($slug)
    {
        $health = Health::where('slug',$slug)->first();


        return response()->json($health);
    }
}

?>