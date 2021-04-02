

//scmod.innerHTML = xmlString;


var FileManagement = function () {
  this.getScreenplay = function (sUrl) {
    if (CacheEngine.getCache(sUrl)) {
      console.log("getting cache");
      var pe = new ParseEngine();
      setTimeout(pe.process(CacheEngine.getCache(sUrl)), 0);
      return CacheEngine.getCache(sUrl);
    }
    else {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', sUrl, true);

      xhr.timeout = 2000; // time in milliseconds

      xhr.onloadend = function () {
        // Request finished. Do processing here.
        if (this.responseXML != null) {
          CacheEngine.setCache(sUrl, this.responseXML.documentElement);
          CacheEngine.setCache("currentScreenPlay", CacheEngine.getCache(sUrl));
          var pe = new ParseEngine();
          setTimeout(pe.process(CacheEngine.getCache(sUrl)), 0);
        }
      };

      xhr.ontimeout = function (e) {
        console.log("what");
        // XMLHttpRequest timed out. Do something here.
      };

      xhr.send(null);
    }


  }
}
