/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector('#body-content');
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          if (page === 'certifications') {
            // Activate image popup
            const elemImg = document.querySelectorAll('.materialboxed');
            console.log(elemImg);
            M.Materialbox.init(elemImg);
          } else if (page === 'projects') {
            const elem = document.querySelectorAll('.collapsible');
            console.log(elem);
            M.Collapsible.init(elem);
          }
        } else if (this.status === 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
        } else {
          content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
        }
      }
    };
    xhttp.open('GET', `pages/${page}.html`, true);
    xhttp.send();
  }

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
          elm.addEventListener('click', (event) => {
            // Tutup sidenav
            const sidenav = document.querySelector('.sidenav');
            // eslint-disable-next-line no-undef
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            const page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  // Activate sidebar nav
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  // Load page content
  let page1 = window.location.hash.substr(1);
  if (page1 === '') page1 = 'home';
  loadPage(page1);
});
