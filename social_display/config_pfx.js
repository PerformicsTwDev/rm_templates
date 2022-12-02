var Performics = {};
Performics.settings = {
  Lp_url: "",
  exit_label: "exit",
  video_source_url:
    "https://gcdn.2mdn.net/videoplayback/id/c2cb8d1672adb680/itag/15/source/doubleclick/ratebypass/yes/mime/video%2Fmp4/acao/yes/ip/0.0.0.0/ipbits/0/expire/3795067462/sparams/id,itag,source,ratebypass,mime,acao,ip,ipbits,expire/signature/B198B939DFD7C7485143BCF473002CC5C7ADD83B.2AC2FC88AD8A087BB53CB25DA9C64F3EB74B270D/key/ck2/file/file.mp4",

  FLD: {
    /*FLD basic settings */
    FLD_src: "",
    FLD_type: "",
    FLD_cat: "",

    /*FLD u1 settings*/
    DBM_IMP: "IMP",
    DBM_CLK: "CLK",

    /* FLD u3-u10 parameter settings*/
    u1: "0",
    u2: "0",
    u3: "0",
    u4: "0",
    u5: "0",
    u6: "0",
    u7: "0",
    u8: "0",
    u9: "0",
    u10: "0",
  },

  isResourceLoaded: false,
  is_clicked: false,
  is_video_exist: true,
};

if (Performics.settings.video_source_url != "") {
  if (!Performics.settings.video_source_url.includes("https")) {
    alert("Landing url not secured!");
  }
}
