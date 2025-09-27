const filterBtns = document.querySelectorAll(".filter-btn");
const component = document.querySelectorAll(".component");

// Filter items based on button click
filterBtns.forEach((button) => {
  button.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter;

    component.forEach((item) => {
      if (filter == 'all') {
        item.style.display = 'block';
        item.classList.add('active');
      } else {
        if (item.classList.contains(filter)) {
          item.style.display = 'block';
          
        } else {
          item.style.display = 'none';
          item.classList.remove('active');
        }
      }
    });
  });
});

