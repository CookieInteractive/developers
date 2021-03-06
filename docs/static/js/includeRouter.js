function includeRouter(cb) {
  var contents, file, xhttp, i;
  document.body.addEventListener('click', (e)=> {
    file = e.target.getAttribute('route-link');
    if (file) {
      contents = document.getElementById('contents');
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            contents.innerHTML = this.responseText;
            var scripts = contents.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
              eval(scripts[i].text);
            }
            setTimeout(function() {
              cb(e);
            }, 0)
            // added for disqus comments - start
            comments = document.getElementById('disqus_thread');
            if (comments) {
              var d = document, s = d.createElement('script');
              s.src = 'https://cookieinteractive.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
              comments.innerHTML = d;
            }
            // added for disqus comments - end
          }
          if (this.status == 404) {
            contents.innerHTML = 'Page not found.';
          }
        }
      }
      xhttp.open('GET', file, true);
      xhttp.send();
    }
  });
};
