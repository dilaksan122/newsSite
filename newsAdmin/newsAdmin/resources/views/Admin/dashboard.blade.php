<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Products Dashboard UI</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
  <div class="app-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="app-icon">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M..."></path></svg>
        </div>
      </div>
      <ul class="sidebar-list">
        <li class="sidebar-list-item has-submenu">
          <a href="#" data-toggle="submenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Cinema News</span>
          </a>
          <ul class="submenu">
            <li class="sidebar-list-sub-item">
              <a href="{{ route('cinema.news') }}">
                <span>Add News</span>
              </a>
            </li>
            <li class="sidebar-list-sub-item">
             
                <a href="{{route('cinema.views')}}">
                <span>View News</span>
                </a>
              
            </li>
          </ul>
        </li>
        <li class="sidebar-list-item has-submenu">
          <a href="#" data-toggle="submenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span>Sports News</span>
        </a>
          <ul class="submenu">
            <li class="sidebar-list-sub-item">
              <a href="{{ route('sports.news') }}">
                <span>Add news</span>
              </a>
            </li>
            <li class="sidebar-list-sub-item">
            <a href="{{ route('Admin.Sports.viewSports') }}">
                <span>View News</span>
              </a>
            </li>
          </ul>
        </li>
        <li class="sidebar-list-item has-submenu">
          <a href="#" data-toggle="submenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tv"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
          <span>Technology News</span>
        </a>
          <ul class="submenu">
            <li class="sidebar-list-sub-item">
              <a href="{{ route('technology.news') }}">
                <span>Add news</span>
              </a>
            </li>
            <li class="sidebar-list-sub-item">
              <a href="{{ route('Admin.Technologies.viewTechnologies') }}">
                <span>View News</span>
              </a>
            </li>
          </ul>
        </li>
        <li class="sidebar-list-item has-submenu">
          <a href="#" data-toggle="submenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Health News</span>
        </a>
          <ul class="submenu">
            <li class="sidebar-list-sub-item">
              <a href="{{ route('health.news') }}">
                <span>Add news</span>
              </a>
            </li>
            <li class="sidebar-list-sub-item">
              <a href="{{route('Admin.Health.viewHealth')}}">
                <span>View News</span>
              </a>
            </li>
          </ul>
        </li>
        <!-- Other sidebar items -->
        <li class="sidebar-list-item has-submenu">
          <a href="#" data-toggle="submenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M16 13H8m8 4H8"/></svg>
            <span>Reviews News</span>
          </a>
          <ul class="submenu">
            <li class="sidebar-list-sub-item">
              <a href="{{ route('reviews') }}">
                <span>Add Reviews</span>
              </a>
            </li>
            <li class="sidebar-list-sub-item">
              <a href="{{ route('Admin.Reviews.viewReviews') }}">
                <span>View Reviews</span>
              </a>
            </li>
          </ul>
        </li>

        
      </ul>
      <div class="account-info">
        <div class="account-info-picture">
          <img src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx3b21hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="Account">
        </div>
        <div class="account-info-name">Sivabalan Dilaksan</div>
        <button class="account-info-more">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" y="12" r="1"/></svg>
        </button>
      </div>
    </div>
    <div class="app-content">
      @yield('content')
    </div>
  </div>
  <script src="{{ asset('js/script1.js') }}"></script>
</body>
</html>
