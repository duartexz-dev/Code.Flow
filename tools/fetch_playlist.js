const fs = require('fs');
fetch('https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1')
  .then(res => res.text())
  .then(html => {
    const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
    const unique = [...new Set(matches)];
    console.log(JSON.stringify(unique, null, 2));
  });
