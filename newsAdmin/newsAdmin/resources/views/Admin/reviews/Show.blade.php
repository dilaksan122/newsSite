@extends('Admin.dashboard')

@section('content')

<link rel="stylesheet" href="{{ asset('css/review-view-news.css') }}">

<div class="content-container">
    <h2>Review News</h2>

    <!-- Success Message -->
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>Author</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reviews as $review)
            <tr>
                <td>{{ $review->id }}</td>
                <td>{{ $review->title }}</td>
                <td>{{ \Illuminate\Support\Str::limit($review->content, 150) }}</td>
                <td>{{ $review->category }}</td>
                <td>{{ $review->author }}</td>
                <td>
                    @if($review->image)
                        <img src="{{ asset($review->image) }}" alt="{{ $review->title }}">
                    @else
                        No image
                    @endif
                </td>
                <td>
                    <a href="{{ route('Admin.Reviews.editReview', $review->id) }}" class="btn btn-edit">Edit</a>
                </td>
                <td>
                    <form action="{{ route('Admin.Reviews.destroyReview', $review->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this news?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-delete">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

@endsection
