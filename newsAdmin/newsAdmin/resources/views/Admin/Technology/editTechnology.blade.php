<!-- resources/views/Admin/Technology/editTechnology.blade.php -->

@extends('Admin.dashboard')

@section('content')
<link rel="stylesheet" href="{{ asset('css/technology-edit-news.css') }}">
<div class="content-container mt-5">
    <h1 class="mb-4">Edit Technology News</h1>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('admin.technology.update', $tech->id) }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" class="form-control" value="{{ old('title', $tech->title) }}" required>
            @error('title')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="content">Content</label>
            <textarea name="content" class="form-control" id="content" required>{{ old('content', $tech->content) }}</textarea>
            @error('content')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="author">Author</label>
            <input type="text" name="author" class="form-control" value="{{ old('author', $tech->author) }}" required>
            @error('author')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="category">Category</label>
            <input type="text" name="category" class="form-control" value="{{ old('category', $tech->category) }}" required>
            @error('category')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="popularity">Popularity</label>
            <input type="number" name="popularity" class="form-control" value="{{ old('popularity', $tech->popularity) }}" required>
            @error('popularity')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="trending">Trending</label>
            <select name="trending" class="form-control" required>
                <option value="1" {{ $tech->trending ? 'selected' : '' }}>Yes</option>
                <option value="0" {{ !$tech->trending ? 'selected' : '' }}>No</option>
            </select>
            @error('trending')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="image">Image</label>
            <input type="file" name="image" class="form-control">
            @if ($tech->image)
                <img src="{{ asset('storage/' . $tech->image) }}" alt="{{ $tech->title }}" class="img-thumbnail mt-2">
            @endif
            @error('image')
                <div class="text-danger">{{ $message }}</div>
            @enderror
        </div>

        <button type="submit" class="btn btn-success">Update</button>
    </form>
</div>

<script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
<script>
    CKEDITOR.replace('content');
</script>
@endsection
