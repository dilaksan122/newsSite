<!-- resources/views/Admin/Technology/viewTechnology.blade.php -->

@extends('Admin.dashboard')

@section('content')
<link rel="stylesheet" href="{{ asset('css/technology-view-news.css') }}">
<div class="content-container mt-5">
    <h2 class="mb-4">All Technology News</h2>

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
                <th>Author</th>
                <th>Category</th>
                <th>Image</th>
                <th>Popularity</th>
                <th>Trending</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            @foreach($technology as $tech)
            <tr>
                <td data-label="ID">{{ $tech->id }}</td>
                <td data-label="Title">{{ $tech->title }}</td>
                <td data-label="Content">{{ \Illuminate\Support\Str::limit($tech->content, 100) }}</td>
                <td data-label="Author">{{ $tech->author }}</td>
                <td data-label="Category">{{ $tech->category }}</td>
                <td data-label="Image">
                    @if($tech->image)
                    <img src="{{ asset($tech->image) }}" alt="{{ $tech->title }}" width="100">
                    @else
                    No Image
                    @endif
                </td>
                <td data-label="Popularity">{{ $tech->popularity }}</td>
                <td data-label="Trending">{{ $tech->trending ? 'Yes' : 'No' }}</td>
                <td data-label="Edit">
                    <a href="{{ route('admin.technology.edit', $tech->id) }}" class="btn btn-edit">Edit</a>
                </td>
                <td data-label="Delete">
                    <form action="{{ route('admin.technology.destroy', $tech->id) }}" method="POST" style="display:inline-block;">
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
