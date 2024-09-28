@extends('Admin.dashboard')

@section('content')
    <link rel="stylesheet" href="{{ asset('css/sports-news.css') }}">
    <div class="content-container">
        <h2>Sports News</h2>

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('storeSportsNews') }}" method="POST" class="sports-news-form" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value="{{ old('title') }}">
                @error('title')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="content">Description</label>
                <textarea id="content" name="content">{{ old('content') }}"></textarea>
                @error('content')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Hockey">Hockey</option>
                    <option value="Golf">Golf</option>
                    <option value="Chess">chess</option>
                    <option value="olympics">olympics</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Motor Sports">Motor Sports</option>
                    <!-- Add more categories as needed -->
                </select>
                @error('category')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="author">Author Name</label>
                <input type="text" id="author" name="author" value="{{ old('author') }}">
                @error('author')
                    <div class="alert alert-danger">{{ $message }}</div>
                @enderror
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" id="image" name="image">
                @error('image')
                    <div class="alert alert-danger">{{ $message }}</div>
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

    <script src="https://cdn.ckeditor.com/4.24.0/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>
@endsection
