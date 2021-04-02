

SceneNav = new (function () {
  let self = this;
  this.Length = 0;
  this.Current = 0;
  this.MaxShow = 10;
  this.Scenes = new Array();
this.context = ".context";
  this.fill = {};
  this.data = "";
  this.cached = false;
  this.target = "";
  this.ContextElement = "";
  this.Populate = function (fill, data) {
    if (data == "") { return; }
    self.fill = fill;
    let hack = document.createElement("div");
    if (!self.cached ||(self.data!=data)) {
      hack.innerHTML = data;
      self.data = hack;
      self.cached = true;
    }


    self.data.querySelectorAll(".Elements").forEach(x => x.style.display = "inline-block");
    self.data.querySelectorAll(".Content").forEach(x => x.style.display = "none");
    hack = self.data;
    var start = self.Current;
    self.Scenes = hack.querySelectorAll(".Section");
    if (self.Scenes.length < 1) {
      self.cached = false;
      return;
    }
    self.Length = self.Scenes.length;
    var navid = Math.max(start - 1, 0);
    if (self.length < 1) {
      return;
    }
    self.CreateNavItem(self.Scenes[Math.max(self.Current - 10, 0)].dataset.uid, "<*", fill, Math.max(self.Current - 10, 0));
    self.CreateNavItem(self.Scenes[Math.max(self.Current - 1, 0)].dataset.uid, "<", fill, Math.max(self.Current - 1, 0));
    for (var i = start; i < Math.min(start + self.MaxShow, self.Length - 2); i++) {

      self.CreateNavItem(self.Scenes[i].dataset.uid, self.Scenes[i].dataset.uid, fill, i);
    }
    self.CreateNavItem(self.Scenes[Math.min(self.Current + 1, self.Length - 1)].dataset.uid, ">", fill, Math.min(self.Current + 1, self.Length - 1));
    self.CreateNavItem(self.Scenes[Math.min(self.Current + 10, self.Length - 1)].dataset.uid, "*>", fill, Math.min(self.Current + 10, self.Length - 1));
    let item = document.querySelector(".DisplayItem");
    item.style.display= "none";
  }
  this.CreateNavItem = function (id, innerText, fill, eid) {
    el = document.createElement("div");
    el.className = "sceneNav";
    el.dataset.suid = id;
    el.dataset.id = eid;
    el.addEventListener("click", function () { self.LoadScene(id, eid) }, false);
    el.innerText = innerText;
    fill.append(el);
  }


  this.AddListeners = function (fill, uid, menuText) {
    let attachee = document.querySelectorAll('[data-action="show"]').forEach(x => {
      x.addEventListener("click", function () { self.ShowAsset(); });
  });
    attachee = document.querySelector('[data-action="claim"]');
    attachee.addEventListener("click", function () { self.ClaimAsset(); });
    attachee = document.querySelector('.AssetDescription');
    attachee.addEventListener("input", function () { self.target.dataset.desc = this.innerText; });
    attachee = document.querySelectorAll('.Add').forEach(x => {
      x.addEventListener("click", function (e) { self.AddAssetToScene(e.target.value); });
    });
  }

  this.AddAssetToScene = function (val) {
    document.querySelector(self.context).style.display = "none";
    let pilot = self.data.querySelector(".Pilot");
    let xtraAsset = pilot.dataset.xtraAssets++;
    let Section = document.querySelector(".Elements");
    let Character = document.createElement("div");
    Character.className = val + "List";
    Character.dataset.uid = val.toLowerCase().substring(0, 1) + xtraAsset + "x";
    Character.innerText = "add Text Here";
    Character.contentEditable = "true";
    let itemHolder = document.createElement("div");
    itemHolder.dataset.uid = val.toLowerCase().substring(0, 1) + xtraAsset + "x";
    itemHolder.className = val + "Holder";
    itemHolder.append(Character);
    let Block = Section.querySelector("." + val + "Block");
    Block.append(itemHolder);
    //Character.addEventListener("input", function () { self.Save(); });
    self.ContextFunction(Character);

    itemHolder.append(self.CreateButton(Character.dataset.uid));
      self.ContextFunction(itemHolder.querySelector(".Upload"), "click");
  }


  this.Save = function () {
    let Scene2Replace = self.data.querySelector('[data-uid="' + self.Scenes[self.Current].dataset.uid + '"] .Elements');
    let Scene2Rwith = document.querySelector('.Elements').innerHTML;
    let scratch=document.querySelector(".scratch");
   scratch.innerHTML = Scene2Rwith;
   
    scratch.querySelectorAll(".Upload").forEach(e => e.outerHTML = "");
    Scene2Replace.innerHTML = scratch.innerHTML;
    scratch.innerHTML = "";
    //console.log(self.data);
    CacheEngine.setCache("Processed", self.data.innerHTML);
    let converted = new ParseEngine().Convert(self.data.innerHTML);
    CacheEngine.setCache("Converted", converted);
  }

  this.ContextFunction = function (x, action) {
    x.addEventListener(action, (e) => {
      e.preventDefault();
      self.context = self.ClaimCheck(x.parentElement.firstChild) ? ".contextClaimed" : ".context";
      let select = document.querySelector(self.context);
      select.style.display = "block";
      select.style.position = "absolute";
      select.style.left = (e.pageX - (50)) + "px";
      select.style.top = (e.pageY - (50)) + "px";
      self.target = x;
      let listener = function (e) {
        if (e.target.className != "menuItem") { document.querySelector(self.context).style.display = "none"; select.removeEventListener("mouseout", listener); };
      }
      select.addEventListener("mouseout", listener);
    });
  }

  this.attachContent = function (sc) {

    let list = sc.querySelectorAll('.CharacterList').forEach(x => {
      self.ContextFunction(x, "contextmenu");
      self.PerformChecks(x);
    });
     list = sc.querySelectorAll('.CharacterHolder').forEach(x => {    
       x.append(self.CreateButton(x.dataset.uid));
       self.ContextFunction(x.querySelector(".Upload"), "click");
    });
    
    list = sc.querySelectorAll('.BackgroundList').forEach(x => {
      self.ContextFunction(x, "contextmenu");
      self.PerformChecks(x);
     
    });
    list = sc.querySelectorAll('.BackgroundHolder').forEach(x => {
      x.append(self.CreateButton(x.dataset.uid));
      self.ContextFunction(x.querySelector(".Upload"), "click");
    });
    list = sc.querySelectorAll('.DialogueList').forEach(x => {
      self.ContextFunction(x, "contextmenu");
      self.PerformChecks(x);
    });
    list = sc.querySelectorAll('.DialogueHolder').forEach(x => {
      x.append(self.CreateButton(x.dataset.uid));
      self.ContextFunction(x.querySelector(".Upload"), "click");
    });
    self.AddListeners();
  }
  this.ClaimAsset = function () {
    document.querySelector(self.context).style.display = "none";
    self.target.parentElement.firstChild.dataset.claimId = CacheEngine.user; //self.userId;
    self.target.parentElement.firstChild.dataset.claim = true;
    self.ClaimCheck(self.target.parentElement.firstChild);
 
  }
  this.PerformChecks=function(x){
    self.ClaimCheck(x);
    self.AssetCheck(x);
  }
  this.AssetCheck = function (element) {
    if (element.dataset.asset) {
      element.style.backgroundColor = "lime";
      if (element.dataset.claimId != CacheEngine.user) {
        return true;
      }

    }
    return false;
  }


  this.ClaimCheck = function (element) {
    if (element.dataset.claim ) {
      element.style.backgroundColor = "orange";
      if (element.dataset.claimId != CacheEngine.user) {
        return true;
      }
      
    }
    return false;
  }
  this.ShowAsset = function () {
    document.querySelector(self.context).style.display="none";
    self.ShowFile(self.target.parentElement.firstChild.dataset.asset);
  }

  this.CreateButton = function (id) {
    bt = document.createElement("button");
    bt.className = "Upload";
    bt.dataset.uid = id;
    bt.innerText = "^";
    return bt;
  }

  this.UpdateScript = function () {
    self.Save();

  }

  this.ShowFile = function (res) {
    let im = document.querySelector(".VideoAsset");
    im.style.display = "none";
 
    let item = document.querySelector(".DisplayItem");
    item.style.display = "block";
    if (self.target.parentElement.firstChild.dataset.uid.indexOf("d") > -1) {
      if (!res) {
        res = "https://madsvids.blob.core.windows.net/whas/033%20but%20im%20not%20out%20of%20tricks.wav";
      }
      else {
        self.target.parentElement.firstChild.dataset.asset = res;
        self.Save();
      }
    }
    else {
      if (!res) {
        res = "https://i.ibb.co/LhkWVY0/0-CA3-D92-E-136-D-438-E-9-F6-F-CD9-FBFF6-DD41.jpg";
      }
      else {
        self.target.parentElement.firstChild.dataset.asset = res;
        self.Save();
      }
    }
    let selecter = ".AssetImg";
    let displayImage = document.querySelector(selecter);
    displayImage.style.display = "block";
    let desc = "enter your description here";
    if (self.target.parentElement.firstChild.dataset.desc) { desc = self.target.parentElement.firstChild.dataset.desc; }

    if (self.target.parentElement.firstChild.dataset.uid.indexOf("d") > -1) {

      im.firstChild.src = res;
      self.LoadListener = function () { setTimeout(im.firstChild.play(), 1000); im.removeEventListener("load", self.LoadListener); }
      im.firstChild.addEventListener("load", self.LoadListener);
      im.style.display = "block";
      displayImage.style.display = "none";
      item.style.height = "250px";
      desc = ".";

    }
    else {
    if (self.target.parentElement.firstChild.dataset.uid.indexOf("b") > -1) {
      selecter = ".DisplayBackground";

    }
    displayImage.innerHTML = '<img src="' + res + '" alt="your image" width="50%" height="50%"/>';
    im = displayImage.querySelector("img");
    im.addEventListener("load", function () { item.style.height = window.getComputedStyle(this, null).getPropertyValue("height"); })

  }
    let displayName = document.querySelector(".AssetName");
    displayName.innerText = self.target.parentElement.firstChild.innerText;
    let displayDesc = document.querySelector(".AssetDescription");
    displayDesc.innerText = desc;

  }
  this.Gather = function () {
    return {
      id: self.target.dataset.uid,
      desc:self.target.dataset.desc
    }
  }
  this.LoadScene = function (id, eid) { self.Current = eid; self.fill.innerHTML = ""; self.Populate(self.fill, self.data); self.ExposeScene(id); }
  this.ExposeScene = function (id) {
    var label = document.querySelector(".SceneLabel");
    var sc = document.querySelector(".SceneContent");

    sc.innerHTML = self.data.querySelector('[data-uid="' + id + '"]').innerHTML;
    label.innerHTML = "SCENE " + id.substring(1);
    self.attachContent(sc);
    let item = document.querySelectorAll("img").forEach(x => x.outerHTML = "");
    document.querySelector(".DisplayItem").style.height = "0px";
  }
})();
