@extends('Admin.dashboard')

@section('content')
    <link rel="stylesheet" href="{{ asset('css/health-news.css') }}">
    <div class="content-container">
        <h2>Health News</h2>

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('storeHealth') }}" method="POST" class="cinema-news-form" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="name">Title</label>
                <input type="text" id="name" name="name" value="{{ old('name') }}">
                @error('name')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="content">Description</label>
                <textarea id="content" name="content">{{ old('content') }}</textarea>
                @error('content')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" class="category" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Medical Research">Medical Research</option>
                    <option value="Diseases">Diseases</option>
                    <option value="Wellness">Wellness</option>
                    <!-- Add more categories as needed -->
                </select>
                @error('category')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="author">Author Name</label>
                <input type="text" id="author" name="author" value="{{ old('author') }}">
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

            <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>

    <script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>
@endsection
