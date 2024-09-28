@extends('Admin.dashboard')

@section('content')
    <link rel="stylesheet" href="{{ asset('css/cinema-edit-news.css') }}">
    <div class="content-container">
        <h2>Edit Cinema News</h2>
        
        <form action="{{ route('cinema.news.update', $cinema->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" value="{{ $cinema->title }}" required>
            </div>

            <div class="form-group">
                <label for="content">Content</label>
                <textarea name="content" required>{{ $cinema->content }}</textarea>
            </div>

            <div class="form-group">
                <label for="slug">Slug</label>
                <textarea name="slug" required>{{ $cinema->slug }}</textarea>
            </div>

            <div class="form-group">
                <label for="category">Category</label>
                <input type="text" name="category" value="{{ $cinema->category }}" required>
            </div>

            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" name="author" value="{{ $cinema->author }}" required>
            </div>

            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" name="image">
                @if($cinema->image)
                    <img src="{{ asset($cinema->image) }}" alt="{{ $cinema->title }}" class="preview-image">
                @endif
            </div>

            <div class="form-group">
                <label for="popularity">Popularity</label>
                <input type="number" name="popularity" value="{{ $cinema->popularity }}" min="0" max="10" required>
            </div>

            <div class="form-group">
                <label for="trending">Trending</label>
                <select name="trending" required>
                    <option value="1" {{ $cinema->trending ? 'selected' : '' }}>Yes</option>
                    <option value="0" {{ !$cinema->trending ? 'selected' : '' }}>No</option>
                </select>
            </div>

            <button type="submit" class="btn btn-submit">Update News</button>
        </form>
    </div>
    <script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>
@endsection
