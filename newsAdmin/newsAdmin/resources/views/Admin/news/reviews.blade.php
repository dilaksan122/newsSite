@extends('Admin.dashboard')

@section('content')
    <link rel="stylesheet" href="{{ asset('css/cinema-news.css') }}">
    <div class="content-container">
        <h2>Reviews</h2>

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('storereviews') }}" method="POST" class="cinema-news-form" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value="{{ old('title') }}" required>
                @error('title')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="content">Description</label>
                <textarea id="content" name="content">{{ old('content') }}"></textarea>
                @error('content')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="author">Author Name</label>
                <input type="text" id="author" name="author" value="{{ old('author') }}" required>
                @error('author')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" id="image" name="image">
                @error('image')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" class="category" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Tollywood">Tollywood</option>
                    <option value="Kollywood">Kollywood</option>
                    <option value="Mollywood">Mollywood</option>
                    <option value="Sandalwood">Sandalwood</option>
                    <option value="Pollywood">Pollywood</option>
                    <!-- Add more film industries as needed -->
                </select>
                @error('category')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="popularity">Popularity (0-10)</label>
                <input type="number" id="popularity" name="popularity" required min="0" max="10">
            </div>
            <div class="form-group">
                <label for="trending">Trending</label>
                <select id="trending" name="trending" class="trending">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div class="form-group">
                <label for="now_playing">Now Playing</label>
                <select id="now_playing" name="now_playing" class="now_playing">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div class="form-group">
                <label for="from_the_blog">From the Blog</label>
                <select id="from_the_blog" name="from_the_blog" class="from_the_blog">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div class="form-group">
                <label for="review_collections">Review Collections</label>
                <select id="review_collections" name="review_collections" class="review_collections">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>

    <script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>
@endsection
