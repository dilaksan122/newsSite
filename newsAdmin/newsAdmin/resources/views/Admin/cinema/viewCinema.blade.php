@extends('Admin.dashboard')

@section('content')
    
    <div class="content-container">
        <h2>Cinema News</h2>

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
                @foreach($cinema as $cinemas)
                <tr>
                    <td>{{ $cinemas->id }}</td>
                    <td>{{ $cinemas->title }}</td>
                    <td>{{ \Illuminate\Support\Str::limit($cinemas->content, 150) }}</td>
                    <td>{{ $cinemas->category }}</td>
                    <td>{{ $cinemas->author }}</td>
                    <td>
                        @if($cinemas->image)
                            <img src="{{ asset($cinemas->image) }}" alt="{{ $cinemas->title }}">
                        @else
                            No image
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('cinema.news.edit', $cinemas->id) }}" class="btn btn-edit">Edit</a>
                    </td>
                    <td>
                        <form action="{{ route('cinema.news.delete', $cinemas->id) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-delete">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Pagination Links -->
        <div class="pagination">
            {{ $cinema->links() }}
        </div>
    </div>
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

table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
}

thead {
    background-color: #4CAF50;
    color: white;
}

thead th {
    padding: 15px;
    text-align: left;
    font-weight: bold;
    color: black;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

tbody tr:hover {
    background-color: #ddd;
}

tbody td {
    padding: 15px;
    color: black;
    border-bottom: 1px solid #ddd;
}

tbody td img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 5px;
    object-fit: cover;
}

.btn {
    display: inline-block;
    padding: 8px 12px;
    margin: 5px 0;
    text-decoration: none;
    color: #fff;
    border-radius: 5px;
    text-align: center;
}

.btn-edit {
    background-color: #4CAF50;
}

.btn-delete {
    background-color: #f44336;
}

/* Pagination Styles */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination .page-item {
    margin: 0 5px;
}

.pagination .page-link {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-decoration: none;
    color: black; /* Set the text color to black */
    background-color: #f8f8f8;
    transition: background-color 0.3s, color 0.3s;
}

.pagination .page-link:hover {
    background-color: #e0e0e0;
    color: black; /* Ensure the hover text color is also black */
}

.pagination .active .page-link {
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
}

/* Responsive Design */
@media (max-width: 768px) {
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }

    thead, tbody, th, td, tr {
        display: block;
    }

    tr {
        margin-bottom: 15px;
    }

    thead {
        float: left;
    }

    tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }

    td, th {
        padding: 10px;
        text-align: right;
        white-space: nowrap;
    }

    td:before, th:before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
        text-transform: uppercase;
    }

    tbody td img {
        max-width: 80px;
        max-height: 80px;
    }

    .btn {
        padding: 6px 10px;
        font-size: 0.9em;
    }

    .pagination {
        flex-direction: column;
        align-items: center;
    }

    .pagination .page-item {
        margin: 5px 0;
    }
}

/* Medium Devices */
@media (min-width: 769px) and (max-width: 1024px) {
    .content-container {
        padding: 15px;
    }

    .content-container h2 {
        font-size: 1.8em;
        margin-bottom: 15px;
        padding-bottom: 8px;
    }

    thead th {
        padding: 12px;
        font-size: 1em;
    }

    tbody td {
        padding: 12px;
        font-size: 0.9em;
    }

    tbody td img {
        max-width: 90px;
        max-height: 90px;
    }

    .btn {
        padding: 7px 11px;
        font-size: 0.95em;
    }
}
</style>
