(function (settings) {
  var creative = {};
  var set = Performics.settings,
    Lp_url = set.Lp_url;
  exit_label = set.exit_label;
  videoExist = set.is_video_exist;
  var FLD_res = [set.FLD].map(function (obj) {
    var nobj = {};
    for (var prop in obj) {
      nobj[prop] = obj[prop];
    }
    return nobj;
  });
  // document.addEventListener("DOMContentLoaded",addDom);
  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
  }

  function init() {
    addDom();
    // addTracking();
    if (Enabler.isVisible()) {
      show();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
    }
  }

  function show() {
    var a = FLD_res[0];
    addImpClkFLD(a.DBM_IMP);
  }

  function addDom() {
    creative.dom = {};
    creative.dom.bgExit = document.getElementById("exitBox");
    creative.dom.featureBox = document.getElementById("featureBox");
  }

  function addTracking() {
    var a = FLD_res[0];
    creative.dom.bgExit.addEventListener("click", function () {
      Enabler.exit("exit", Lp_url);
      addImpClkFLD(a.DBM_CLK);
      Performics.settings.is_clicked = true;
      if (videoExist) {
        document.querySelector("video").pause();
        document.getElementById("play_btn").style.display = "block";
      }
    });
  }

  function addImpClkFLD(u1u2) {
    var a = FLD_res[0];
    var u_array = [a.u3, a.u4, a.u5, a.u6, a.u7, a.u8, a.u9, a.u10];
    var impclk_array = [u1u2, "0"];
    impclk_array.push.apply(impclk_array, u_array);
    FLD.apply(null, impclk_array);
  }

  function FLD(u1, u2, u3, u4, u5, u6, u7, u8, u9, u10) {
    // for (var i =0 ; i<arguments.length;i++){
    // 	if(!!arguments[i]){
    // 		arguments[i] = arguments[i];
    // 	} else {
    // 		arguments[i] = "\"\"";
    // 	}
    // }
    var video_img_obj;
    var a = FLD_res[0];
    video_img_obj = new Image();
    video_img_obj.width = "1px";
    video_img_obj.height = "1px";
    video_img_obj.src =
      "https://ad.doubleclick.net/ddm/activity/src=" +
      a.FLD_src +
      ";type=" +
      a.FLD_type +
      ";cat=" +
      a.FLD_cat +
      ";u1=" +
      u1 +
      ";u2=" +
      u2 +
      ";u3=" +
      u3 +
      ";u4=" +
      u4 +
      ";u5=" +
      u5 +
      ";u6=" +
      u6 +
      ";u7=" +
      u7 +
      ";u8=" +
      u8 +
      ";u9=" +
      u9 +
      ";u10=" +
      u10 +
      ";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1?";
  }
})(Performics.settings);
