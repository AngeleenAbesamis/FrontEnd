CacheEngine = new (function () {
  this.pilot = 3;
  this.user = 1;
  this.cache = new Array();
  this.callback = function () {
    console.log()
  };
  this.purge = function (ckey) {
    if (ckey == "all") {
      this.cache = new Array();
    }
    else {
      this.cache[ckey] = undefined;
    }
  }
  this.getCache = function (ckey) {
    if (this.cache[ckey]) {
      return this.cache[ckey];
    }
    else {
      return false;
    }
  };
  this.setCache = function (ckey, cacheitem) {
    this.cache[ckey] = cacheitem;
    if (ckey == "Converted" && cacheitem!="") {
      this.callback(cacheitem);
    }
  };
  this.onProcessedChange = function (cb) { this.callback = cb; };
})();

