@extends('Admin.dashboard')

@section('content')
<div class="content-container">
    <h2>Edit Health News</h2>

    <form action="{{ route('Admin.Health.updateHealth', $healthNews->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="name">Title:</label>
            <input type="text" id="name" name="name" value="{{ $healthNews->name }}" required>
        </div>

        <div class="form-group">
            <label for="content">Content:</label>
            <textarea id="content" required>{{ $healthNews->content }}</textarea>
        </div>

        <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" id="author" name="author" value="{{ $healthNews->author }}" required>
        </div>

        <div class="form-group">
            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="{{ $healthNews->category }}" required>
        </div>

        <div class="form-group">
            <label for="trending">Trending:</label>
            <select id="trending" name="trending" required>
                <option value="1" {{ $healthNews->trending ? 'selected' : '' }}>Yes</option>
                <option value="0" {{ !$healthNews->trending ? 'selected' : '' }}>No</option>
            </select>
        </div>

        <div class="form-group">
            <label for="popularity">Popularity:</label>
            <input type="number" id="popularity" name="popularity" value="{{ $healthNews->popularity }}" min="0" max="10" required>
        </div>

        <div class="form-group">
            <label for="image">Image:</label>
            @if($healthNews->image)
                <img src="{{ asset($healthNews->image) }}" alt="{{ $healthNews->name }}" class="edit-image">
            @endif
            <input type="file" id="image" name="image">
        </div>

        <button type="submit" class="btn btn-update">Update</button>
    </form>
</div>


<script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('content');
    </script>

@endsection
<style>
/* General Styles */
.content-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content-container h2 {
    text-align: center;
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: black;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group select,
.form-group input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
}

.edit-image {
    display: block;
    max-width: 150px;
    max-height: 150px;
    margin-bottom: 10px;
    border-radius: 5px;
    object-fit: cover;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #45a049;
}

.btn-update {
    display: block;
    width: 100%;
    text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
    .content-container {
        padding: 15px;
    }

    .content-container h2 {
        font-size: 1.8em;
        margin-bottom: 15px;
        padding-bottom: 8px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group input[type="text"],
    .form-group input[type="number"],
    .form-group textarea,
    .form-group select,
    .form-group input[type="file"] {
        padding: 8px;
    }

    .edit-image {
        max-width: 100px;
        max-height: 100px;
    }

    .btn {
        padding: 8px 15px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .content-container {
        padding: 15px;
    }

    .content-container h2 {
        font-size: 1.8em;
        margin-bottom: 15px;
        padding-bottom: 8px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group input[type="text"],
    .form-group input[type="number"],
    .form-group textarea,
    .form-group select,
    .form-group input[type="file"] {
        padding: 9px;
    }

    .edit-image {
        max-width: 120px;
        max-height: 120px;
    }

    .btn {
        padding: 9px 18px;
    }
}
</style>
