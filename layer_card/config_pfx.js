var Performics = {};
Performics.settings = {
  Lp_url: "http://www.moderngirl.com.tw/en/home",
  exit_label: "exit",
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
  is_video_exist: false,
};
if (
  Performics.settings.is_video_exist &&
  !Performics.settings.video_source_url.includes("https")
) {
  alert("url not secured");
}
