
var ParseEngine = function () {
  var self = this;
  this.ParseCharacters = function (scmod) {
    var chars = new Array();
    var characters = scmod.querySelectorAll(".Character");
    var cid = 0;
    for (var z in characters) {
      x = characters[z];
      if (x.textContent) {
        var charname = x.textContent.trim().replace(/\(.*\)/gi, "") + "";
        if (!chars[charname]) {
          chars[charname] = { id: x.textContent.trim().replace(/\(.*\)/gi, "").replace("#", ""), count: 0 }
          if (!chars[charname].uid) {
            chars[charname].uid = "c" + (cid++);
          }
        }
        chars[charname].count += 1;
        x.dataset.uid = chars[charname].uid;
        x.id = chars[charname].id;
        x.count = chars[charname].count;
        x.textContent = chars[charname].id;

        el = x.parentElement.parentElement.querySelectorAll(".CharacterBlock");
        this.FillCharacters(el[0], chars[charname].id, chars[charname].uid, x.parentElement.parentElement.dataset.uid);
        var clist = document.querySelectorAll(".charlist");
        this.FillCharAnchors(clist[0], chars[charname].id, chars[charname].uid);

      }

    }
  }

  this.ParseBackground = function (scmod) {

    var count = 0;
    var bg = scmod.querySelectorAll(".Scene").forEach(x => {

      var e = document.createElement("div");
      if (!e.dataset.uid) {
        e.dataset.uid = "b" + (count++);
      }
      let holder = document.createElement("div");
      holder.className = "BackgroundHolder";
      holder.dataset.uid = e.dataset.uid;
      e.className = "BackgroundList";
      e.innerText = x.innerText;
      holder.appendChild(e);
      var sel = x.parentElement.parentElement.querySelector(".Elements");
      if (sel != null) {
        var fill = sel.querySelector('.BackgroundBlock');
        if (fill != null) {
          fill.appendChild(holder);
        }
      }
    });

  }
  this.FindCharForDialogue = function (element) {
    if (!(element.previousElementSibling.className == "Character")) {
      return self.FindCharForDialogue(element.previousElementSibling);
    }
    else {
      return element.previousElementSibling;
    }
  }


  this.ParseDialogue = function (scmod) {

    var count = 0;
    var dialog = scmod.querySelectorAll(".Dialogue").forEach(x => {

      x.dataset.role = self.FindCharForDialogue(x).dataset.uid;
      if (!x.dataset.uid) {
        x.dataset.uid = "d" + (count++);
      }
      
      var e = document.createElement("div");
      e.dataset.uid = x.dataset.uid;
      e.className = "DialogueList";
      e.dataset.role = x.dataset.role;
      e.innerText = x.innerText;
      var sel = x.parentElement.parentElement.querySelector(".Elements");
      if (sel != null) {
        var fill = sel.querySelector('.DialogueBlock');
        if (fill != null) {
          let holder = document.createElement("div");
          holder.className = "DialogueHolder";
          holder.dataset.uid = e.dataset.uid;
          holder.appendChild(e);
          fill.appendChild(holder);
        }
      }
    });

  }

  this.display = function (classitem) {
  }

  this.FillCharacters = function (fill, char, uid, sid) {

    if ((fill.querySelector('[data-uid="' + uid + '"]') == null)) {
      var e = document.createElement("div");
      e.dataset.uid = uid;
      e.dataset.scene = sid;
      e.className = "CharacterList";
      e.innerText = char;
      let holder = document.createElement("div");
      holder.className = "CharacterHolder";
      holder.dataset.uid = e.dataset.uid;
      holder.appendChild(e);
      fill.appendChild(holder);
    }
  }



  this.FillCharAnchors = function (fill, char, uid) {
    if ((fill.querySelector('[data-uid="' + uid + '"]') == null)) {

      var ac = document.createElement("a");
      ac.className = "CharacterLink";
      ac.dataset.uid = uid;
      ac.dataset.scene = 0;
      ac.innerText = char;
      fill.appendChild(ac);
      ac.href = "#" + char;
      ac.outerHTML += " - ";
    }
  }
  this.process = function (xmlDoc, purge) {
    let scmod = document.getElementById("sceneMaker");
    scmod.innerHTML = "";
    if (CacheEngine.getCache("Processed") && !purge) {
      scmod.innerHTML = CacheEngine.getCache("Processed");
      scmod.querySelectorAll(".Content").forEach(x => x.style.display = "block");
      scmod.querySelectorAll(".Elements").forEach(x => x.style.display = "none");
      return;
    }
    if (xmlDoc.innerHtml) { xmlDoc = xmlDoc.innerHTML; }
    xmlString = xmlDoc.replace(/<Paragraph/g, "<div");
    xmlString = xmlString.replace(/\/Paragraph/g, "\/div");
    xmlString = xmlString.replace(/<ScriptNote/g, '<div class="scriptnote"');
    xmlString = xmlString.replace(/\/ScriptNote/g, "\/div");
    xmlString = xmlString.replace(/Type=/g, "class=");
    xmlString = xmlString.replace(/<Text/g, "<span");
    xmlString = xmlString.replace(/\/Text/g, "\/span");
    let pilot = document.createElement("div");
    pilot.className = "Pilot";
    pilot.dataset.xtraAssets = 0;
    scmod.append(pilot);
    var sid = 0;
    var sceneArray = xmlString.split('<div class="Scene Heading');
    for (var scene in sceneArray) {
      if (scene == 0 || scene >= sceneArray.length - 1) { continue; }
      if (sceneArray[scene].replace(/span/ig, "").replace(/div/ig, "").replace(/</ig, "").replace(/>/ig, "").replace(/\//ig, "").trim() == "") { continue; }
      var s = document.createElement("div");
      s.className = "Section";
      s.dataset.uid = "s" + (sid++);
      section = pilot.appendChild(s);
      var d = document.createElement("div");
      d.className = "Content";
      d.innerHTML = '<div class="Scene Heading' + sceneArray[scene];
      section.appendChild(d);
      var e = document.createElement("div");
      e.className = "Elements";
      var els = section.appendChild(e);
      var eb = document.createElement("div");
      eb.className = "label";
      eb.innerText = "Background   ";
      els.appendChild(eb);
      let bt = document.createElement("button");
      bt.className = "Add";
      bt.innerText = "+";
      bt.value = "Background";
      eb.append(bt);

      eb = document.createElement("div");
      eb.className = "BackgroundBlock";
      els.appendChild(eb);

      eb = document.createElement("div");
      eb.className = "label";
      eb.innerText = "Characters   ";
      els.appendChild(eb);
      bt = document.createElement("button");
      bt.className = "Add";
      bt.value = "Character";
      bt.innerText = "+";
      eb.append(bt);
      eb = document.createElement("div");
      eb.className = "CharacterBlock";
      els.appendChild(eb);
      eb = document.createElement("div");
      eb.className = "label";
      eb.innerText = "Dialogue   ";
      els.appendChild(eb);
      bt = document.createElement("button");
      bt.className = "Add";
      bt.value = "Dialogue";
      bt.innerText = "+";
      eb.append(bt);
      eb = document.createElement("div");
      eb.className = "DialogueBlock";
      els.appendChild(eb);
      this.ParseCharacters(pilot);

    }
    this.ParseBackground(pilot);
    this.ParseDialogue(pilot);
    CacheEngine.setCache("Processed", scmod.innerHTML);
    let converted=this.Convert(scmod.innerHTML);
    CacheEngine.setCache("Converted", converted);
  }
  this.AddButton = function (eb) {
  }
  this.reProcess = function () {
    scmod = document.getElementById("sceneMaker").innerHTML;
    CacheEngine.setCache("Processed", scmod);
    let converted = this.Convert(scmod);
    CacheEngine.setCache("Converted", converted);
  }
  this.ProcessSaved = function (data) {
    let scmod = document.getElementById("sceneMaker")
    scmod.innerHTML = data;
    CacheEngine.setCache("Processed", data);
    scmod.querySelectorAll(".Content").forEach(x => x.style.display = "block");
    scmod.querySelectorAll(".Elements").forEach(x => x.style.display = "none");
  }
  this.Convert = function (parsed) {
    
      let ScriptPayload = {
        "pilotID": CacheEngine.pilot,
        "scriptBody": parsed,
        "userID": CacheEngine.user,
        "scenes": []
      };
      let count = 0;
    document.querySelectorAll(".Section").forEach(x => {
        ScriptPayload.scenes.push({
          "sceneIndex": count++,
          "sceneName": "SceneName",
          "sceneDescription": "SceneDescription",
          "parsedID": x.dataset.uid
        });
      });
    return ScriptPayload;
  }


}
