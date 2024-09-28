document.addEventListener('DOMContentLoaded', function() {
    const submenuItems = document.querySelectorAll('[data-toggle="submenu"]');
  
    submenuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const parentItem = item.parentElement;
        const activeItem = document.querySelector('.sidebar-list-item.has-submenu.active');
  
        if (activeItem && activeItem !== parentItem) {
          activeItem.classList.remove('active');
          activeItem.querySelector('.submenu').style.display = 'none';
        }
  
        parentItem.classList.toggle('active');
        const submenu = parentItem.querySelector('.submenu');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      });
    });
  });
  