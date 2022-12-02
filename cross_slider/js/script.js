var _mousedownHandler = false,
  set = Performics.settings;

function init() {
  document.getElementById("leftImage").src = set.left_img;
  document.getElementById("rightImage").src = set.right_img;
  setTimeout(() => {
    adjust();
  }, 500);
}

function pauseVideo() {
  var videoM = {};
  videoM.dom = {};
  videoM.dom.vid = document.querySelector("#videoBox video");
  videoM.dom.playBtn = document.getElementById("play_btn");

  videoM.dom.vid.pause();
  videoM.dom.playBtn.style.display = "block";
  if (videoM.dom.vid.readyState > 0) {
    videoM.dom.vid.currentTime = 1;
  }
}

function adjust() {
  var img2 = document.querySelector(".img2");
  var img2W = img2.offsetWidth;
  var img2H = img2.offsetHeight;
  var box = document.getElementById("in-box");
  var handler = document.getElementById("handler");
  var result = document.querySelector(".resultImg");
  var resultImg = document.querySelector(".resultImg .imgct3");
  var resultImg2 = document.querySelector(".resultImg .imgct4");
  var resultImgBox = document.querySelector("#resultImg");
  var resultImg2Box = document.querySelector("#resultImg2");

  function initSetup() {
    box.style.height = img2H + "px";
    img2.setAttribute(
      "style",
      "clip:rect(0px," + img2W + "px," + img2H + "px," + img2W / 2 + "px)"
    );
    handler.style.left = img2W / 2 - 17 + "px";

    result.style.height = resultImg + "px";
    resultImg.src = set.result_right_img;
    resultImg2.src = set.result_left_img;

    setTimeout(() => {
      animatedOnLoad();
    }, 300);
  }

  function animatedOnLoad() {
    gsap.fromTo(
      "#handler",
      { left: handler.style.left - 23 },
      { left: "60px", duration: 0.5 }
    );
    gsap.fromTo(
      ".img2",
      { clip: "rect(0px,320px,300px," + (handler.style.left - 5) + "px)" },
      { clip: "rect(0px,320px,300px,77px)", duration: 0.5, onComplete: step2 }
    );

    function step2() {
      gsap.fromTo(
        "#handler",
        { left: "60px" },
        { left: "250px", duration: 0.5 }
      );
      gsap.fromTo(
        ".img2",
        { clip: "rect(0px,320px,300px,77px)" },
        {
          clip: "rect(0px,320px,300px,260px)",
          duration: 0.5,
          onComplete: step3,
        }
      );
    }
    function step3() {
      gsap.fromTo(
        "#handler",
        { left: "250px" },
        { left: img2W / 2 - 17 + "px", duration: 0.5 }
      );
      gsap.fromTo(
        ".img2",
        { clip: "rect(0px,320px,300px,260px)" },
        {
          clip: "rect(0px,320px,300px,159px)",
          duration: 0.5,
        }
      );
    }
  }

  function setupHandler() {
    box.addEventListener("mousedown", function (evt) {
      _mousedownHandler = true;
      evt.stopPropagation();
    });
    window.addEventListener("mouseup", function (evt) {
      _mousedownHandler = false;
      evt.stopPropagation();
    });
    box.addEventListener("touchstart", function (evt) {
      _mousedownHandler = true;
      evt.stopPropagation();
    });
    window.addEventListener("touchend", function (evt) {
      _mousedownHandler = false;
      evt.stopPropagation();
    });
    box.addEventListener("click", function (evt) {
      evt.stopPropagation();
    });

    handler.addEventListener("mouseup", function (evt) {
      var position = handler.style.left;
      if (position < 160) {
        Enabler.counter("engage_right", true);
      }

      if (position >= 160) {
        Enabler.counter("engage_left", true);
      }
    });

    handler.addEventListener("touchend", function (evt) {
      var position = handler.style.left;
      if (position < 143) {
        Enabler.counter("touch_engage_left");
      }

      if (position >= 143) {
        Enabler.counter("touch_engage_right");
      }
    });

    resultImg2Box.addEventListener("click", function () {
      Enabler.exit("exit_left", set.url_left);
    });

    resultImgBox.addEventListener("click", function () {
      Enabler.exit("exit_right", set.url_right);
    });

    function p(evt) {
      if (_mousedownHandler) {
        var position = evt.clientX;
        handler.style.left = position - 23 + "px";
        img2.setAttribute(
          "style",
          "clip:rect(0px," +
            img2W +
            "px," +
            img2H +
            "px," +
            (position - 5) +
            "px)"
        );
        if (position < 10) {
          box.removeEventListener("mousemove", p);
          box.classList.add("animated");
          box.classList.add("fadeOut");
          setTimeout(function () {
            resultImgBox.style.zIndex = "1";
          }, 500);

          Enabler.counter("exit_right", false);
          setTimeout(function () {
            Enabler.exit("exit_right", set.url_right);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);

          resultImg2Box.style.display = "none";
          resultImg.style.opacity = 1;
        }

        if (position > 310) {
          box.removeEventListener("mousemove", p);
          box.classList.add("animated");
          box.classList.add("fadeOut");
          setTimeout(function () {
            resultImg2Box.style.zIndex = "1";
          }, 500);

          Enabler.counter("exit_left", false);
          setTimeout(function () {
            Enabler.exit("exit_left", set.url_left);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);

          resultImgBox.style.display = "none";
          resultImg2.style.opacity = 1;
        }
      }
      evt.stopPropagation();
    }

    function p_d(evt) {
      if (_mousedownHandler) {
        var position = evt.clientX;

        if (position < 160) {
          box.removeEventListener("mousemove", p);
          gsap.fromTo(
            "#handler",
            { left: position - 23 },
            { left: "-23px", duration: 0.5 }
          );
          gsap.fromTo(
            ".img2",
            { clip: "rect(0px,320px,300px," + (position - 5) + "px)" },
            { clip: "rect(0px,320px,300px,0px)", duration: 0.5 }
          );

          gsap.fromTo(
            "#in-box",
            { opacity: 1 },
            { opacity: 0, duration: 1, delay: 0.5 }
          );
          setTimeout(function () {
            resultImgBox.style.zIndex = "1";
          }, 1000);

          // Enabler.counter("exit_right", false);
          Enabler.counter("engage_right", false);
          setTimeout(function () {
            Enabler.exit("exit_right", set.url_right);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);

          resultImg2Box.style.display = "none";
          resultImg.style.opacity = 1;
        }

        if (position >= 160) {
          box.removeEventListener("mousemove", p);
          gsap.fromTo(
            "#handler",
            { left: position - 23 },
            { left: "304px", duration: 0.5 }
          );
          gsap.fromTo(
            ".img2",
            { clip: "rect(0px,320px,300px," + (position - 5) + "px)" },
            { clip: "rect(0px,320px,300px,320px)", duration: 0.5 }
          );

          gsap.fromTo(
            "#in-box",
            { opacity: 1 },
            { opacity: 0, duration: 1, delay: 0.5 }
          );
          setTimeout(function () {
            resultImg2Box.style.zIndex = "1";
          }, 1000);
          // Enabler.counter("exit_left", false);
          Enabler.counter("engage_left", false);
          setTimeout(function () {
            Enabler.exit("exit_left", set.url_left);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);
          resultImgBox.style.display = "none";
          resultImg2.style.opacity = 1;
        }
      }
      evt.stopPropagation();
    }

    box.addEventListener("mousemove", p);
    box.addEventListener("mouseup", p_d);

    function m(evt) {
      if (_mousedownHandler) {
        var position = evt.touches[0].clientX;
        handler.style.left = position - 23 + "px";
        img2.setAttribute(
          "style",
          "clip:rect(0px," +
            img2W +
            "px," +
            img2H +
            "px," +
            (position - 5) +
            "px)"
        );
        if (position < 10) {
          box.removeEventListener("touchmove", m);
          box.classList.add("animated");
          box.classList.add("fadeOut");
          setTimeout(function () {
            resultImgBox.style.zIndex = "1";
          }, 500);

          Enabler.counter("exit_right", false);
          setTimeout(function () {
            Enabler.exit("exit_right", set.url_right);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);
          resultImg2Box.style.display = "none";
          resultImg.style.opacity = 1;
        }

        if (position > 310) {
          box.removeEventListener("touchmove", m);
          box.classList.add("animated");
          box.classList.add("fadeOut");
          setTimeout(function () {
            resultImg2Box.style.zIndex = "1";
          }, 500);

          Enabler.counter("exit_left", false);
          setTimeout(function () {
            Enabler.exit("exit_left", set.url_left);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);
          resultImgBox.style.display = "none";
          resultImg2.style.opacity = 1;
        }
      }
      evt.stopPropagation();
    }

    function m_d(evt) {
      if (_mousedownHandler) {
        var position = evt.clientX;

        if (position < 160) {
          box.removeEventListener("touchmove", p);
          gsap.fromTo(
            "#handler",
            { left: position - 23 },
            { left: "-23px", duration: 0.5 }
          );
          gsap.fromTo(
            ".img2",
            { clip: "rect(0px,320px,300px," + (position - 5) + "px)" },
            { clip: "rect(0px,320px,300px,0px)", duration: 0.5 }
          );

          gsap.fromTo(
            "#in-box",
            { opacity: 1 },
            { opacity: 0, duration: 1, delay: 0.5 }
          );
          setTimeout(function () {
            resultImgBox.style.zIndex = "1";
          }, 1000);

          // Enabler.counter("exit_right", false);
          Enabler.counter("engage_right", false);
          setTimeout(function () {
            Enabler.exit("exit_right", set.url_right);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);

          resultImg2Box.style.display = "none";
          resultImg.style.opacity = 1;
        }

        if (position >= 160) {
          box.removeEventListener("touchmove", p);
          gsap.fromTo(
            "#handler",
            { left: position - 23 },
            { left: "304px", duration: 0.5 }
          );
          gsap.fromTo(
            ".img2",
            { clip: "rect(0px,320px,300px," + (position - 5) + "px)" },
            { clip: "rect(0px,320px,300px,320px)", duration: 0.5 }
          );

          gsap.fromTo(
            "#in-box",
            { opacity: 1 },
            { opacity: 0, duration: 1, delay: 0.5 }
          );
          setTimeout(function () {
            resultImg2Box.style.zIndex = "1";
          }, 1000);
          // Enabler.counter("exit_left", false);
          Enabler.counter("engage_left", false);
          setTimeout(function () {
            Enabler.exit("exit_left", set.url_left);
            Performics.settings.is_clicked = true;
            pauseVideo();
          }, 1500);
          resultImgBox.style.display = "none";
          resultImg2.style.opacity = 1;
        }
      }
      evt.stopPropagation();
    }

    box.addEventListener("touchmove", m);
    box.addEventListener("touchend", m_d);
  }

  initSetup();
  setupHandler();
  document.querySelector("#in-box").style.opacity = 1;
}
window.addEventListener("load", init);
