(function() {
    if (typeof window === 'undefined') return;
    if (typeof window.signals !== 'undefined') return;
    var script = document.createElement('script');
    script.src = 'https://cdn.cr-relay.com/v1/site/ecfd6f4a-ae37-43b1-b11b-2a92f09f3089/signals.js';
    script.async = true;
    window.signals = Object.assign(
      [],
      ['page', 'identify', 'form'].reduce(function (acc, method){
        acc[method] = function () {
          signals.push([method, arguments]);
          return signals;
        };
       return acc;
      }, {})
    );
    document.head.appendChild(script);
  })();