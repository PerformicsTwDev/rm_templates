(function (settings) {
  var set = Performics.settings;
  var is_firstRead = true,
    is_open = false;
  var creative = {};
  creative.dom = {};

  document.addEventListener("DOMContentLoaded", addDom);

  var checkResLoaded = setInterval(function () {
    if (Performics.settings.isResourceLoaded) {
      show();
      clearInterval(checkResLoaded);
    } else {
      console.log("wait for moduleResources");
    }
  }, 100);

  function show() {
    detectViewability();
    startVideo();
    // creative.dom.video.addEventListener('ended',removeAni, false);
  }

  function addDom() {
    creative.dom.container = document.getElementById("mainContainer");
    creative.dom.banner = document.getElementById("banner");
    creative.dom.box = document.getElementById("box");
    creative.dom.featureBox = document.getElementById("featureBox");
    creative.dom.videoPoster = document.getElementById("videoPoster");
    creative.dom.video = document.getElementById("video-1");
    creative.dom.play_btn = document.getElementById("play_btn");
  }

  function detectViewability() {
    var a = setInterval(function () {
      var tempStr = document.getElementById("viewR").innerHTML;
      var percVal = String(tempStr).split(": ")[1].split(".")[0];
      Performics.settings.viewability = percVal;
    });
  }

  function startVideo() {
    var openStore = setInterval(function () {
      if (set.viewability >= 80 && is_firstRead) {
        ani();
        console.log("80up");
        video50Listener();
        // setTimeout(videoPlay,1000);
        clearInterval(openStore);
        is_open = true;
        is_firstRead = false;
      }
    }, 500);
  }

  function video50Listener() {
    var video50 = setInterval(function () {
      console.log("percent == " + set.viewability);
      if (set.viewability >= 50 && !is_firstRead && is_open) {
        playVideo();
      } else if (set.viewability < 50 && !is_firstRead && is_open) {
        pauseVideo();
      }
    }, 500);
    creative.dom.video.addEventListener(
      "ended",
      function () {
        clearInterval(video50);
      },
      false
    );
    creative.dom.box.addEventListener(
      "click",
      function () {
        clearInterval(video50);
      },
      false
    );
    creative.dom.box.addEventListener(
      "touchEnd",
      function () {
        clearInterval(video50);
      },
      false
    );
  }

  function playVideo() {
    creative.dom.video.play();
    creative.dom.play_btn.style.display = "none";
  }

  function pauseVideo() {
    creative.dom.video.pause();
    creative.dom.play_btn.style.display = "block";
  }

  function ani() {
    var inread = creative.dom.container;
    inread.classList.add("down");
    inread.classList.remove("up");

    inread.setAttribute("style", "animation:frameBig 1s forwards");

    var featureBox = creative.dom.featureBox;
    featureBox.setAttribute("style", "animation:frameBig 1s forwards");

    var banner = creative.dom.banner;
    banner.setAttribute("style", "animation:bannerBig 1s forwards;");

    var video = creative.dom.box;
    video.setAttribute("style", "animation:videoBig 1.2s forwards;");

    var vPoster = creative.dom.videoPoster;
    vPoster.setAttribute("style", "animation:videoBig 1.2s forwards;");
    setTimeout(function () {
      vPoster.style.display = "none";
    }, 1200);

    is_open = true;
  }

  function removeAni() {
    var inread = creative.dom.container;
    inread.classList.add("up");
    inread.classList.remove("down");

    inread.setAttribute("style", "animation:frameSmall 1s forwards");

    var featureBox = creative.dom.featureBox;
    featureBox.setAttribute("style", "animation:frameSmall 1s forwards");

    var banner = creative.dom.banner;
    banner.setAttribute("style", "animation:bannerSmall 1s forwards;");

    var video = creative.dom.box;
    video.setAttribute("style", "animation:videoSmall 1.2s forwards;");

    var vPoster = creative.dom.videoPoster;
    vPoster.setAttribute("style", "animation:videoSmall 1.2s forwards;");
    setTimeout(function () {
      vPoster.style.display = "block";
    }, 1200);

    is_open = false;
    is_firstRead = true;
    setTimeout(openAgain, 5000);
  }

  function openAgain() {
    var a = setInterval(function () {
      if (!is_open) {
        startVideo();
        clearInterval(a);
      }
    });
  }
})(Performics.settings);
