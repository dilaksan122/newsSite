@extends('Admin.dashboard')

@section('content')
<link rel="stylesheet" href="{{ asset('css/sports-edit-news.css') }}">

<!-- CKEditor CDN -->
<script src="https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"></script>

<div class="edit-container">

    <h2>Edit Sports News</h2>

    <form action="{{ route('Admin.Sports.updateSports', $sport->id) }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" value="{{ $sport->title }}" required>
        </div>

        <div class="form-group">
            <label for="content">Content</label>
            <textarea name="content" id="content" rows="5" required>{{ $sport->content }}</textarea>
        </div>

        <div class="form-group">
            <label for="author">Author</label>
            <input type="text" name="author" id="author" value="{{ $sport->author }}" required>
        </div>

        <div class="form-group">
            <label for="category">Category</label>
            <input type="text" name="category" id="category" value="{{ $sport->category }}" required>
        </div>

        <div class="form-group">
            <label for="image">Image</label>
            @if($sport->image)
                <img src="{{ asset($sport->image) }}" alt="{{ $sport->title }}" class="current-image">
            @endif
            <input type="file" name="image" id="image">
        </div>

        <div class="form-group">
            <label for="popularity">Popularity</label>
            <input type="number" name="popularity" id="popularity" value="{{ $sport->popularity }}" min="0" max="10" required>
        </div>

        <div class="form-group">
            <label for="trending">Trending</label>
            <select name="trending" id="trending" required>
                <option value="1" {{ $sport->trending ? 'selected' : '' }}>Yes</option>
                <option value="0" {{ !$sport->trending ? 'selected' : '' }}>No</option>
            </select>
        </div>

        <button type="submit" class="btn btn-update">Update</button>
        <a href="{{ route('Admin.Sports.viewSports') }}" class="btn btn-cancel">Cancel</a>
    </form>
</div>

<script>
    CKEDITOR.replace('content');
</script>
@endsection
