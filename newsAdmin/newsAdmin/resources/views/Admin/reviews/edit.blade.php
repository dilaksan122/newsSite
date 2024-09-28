<!-- resources/views/Admin/reviews/edit.blade.php -->

@extends('Admin.dashboard')

@section('content')
<link rel="stylesheet" href="{{ asset('css/review-edit-news.css') }}">

<div class="content-container">
    <h2>Edit Review</h2>
    <form action="{{ route('Admin.Reviews.update', $review->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
       
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="{{ $review->title }}" required>
        </div>
        
        <div class="form-group">
            <label for="content">Content:</label>
            <textarea id="content" name="content" required>{{ $review->content }}</textarea>
        </div>
        
        <div class="form-group">
            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="{{ $review->category }}" required>
        </div>
        
        <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" value="{{ $review->author }}" required>
        </div>
        
        <div class="form-group">
            <label for="image">Image:</label>
            <input type="file" id="image" name="image">
            @if($review->image)
                <img src="{{ asset($review->image) }}" alt="{{ $review->title }}" style="max-width: 100px; max-height: 100px;">
            @endif
        </div>
        
        <button type="submit" class="btn-submit">Update Review</button>
    </form>
</div>
<script src="https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"></script>
<script>
    CKEDITOR.replace('content');
</script>

@endsection
