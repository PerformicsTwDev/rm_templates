var set = Performics.settings;
(function () {
  var _window = typeof window !== "undefined" ? window : this;
  var countdown = (_window.countdown = function (id, setting) {
    // countdown time
    var x = setInterval(function () {
      var future = new Date(setting.datetime);
      var now = new Date().getTime();
      var timeLeft = future - now;

      var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      id.innerHTML =
        (days < 10 ? "0" + days : days) +
        " 天 " +
        (hours < 10 ? "0" + hours : hours) +
        " 時 " +
        minutes +
        " 分 ";
      if (setting.secondDisplay) {
        id.append(seconds + "秒");
      }

      if (timeLeft < 0) {
        clearInterval(x);
        id.innerHTML = "活動期限已至";
      }
    }, 1000);

    // position, color, font size
    id.style.left = setting.posX + "px";
    id.style.bottom = setting.posY + "px";
    id.style.color = setting.txtColor;
    id.style.fontSize = setting.txtSize + "px";
    id.style.letterSpacing = setting.txtSpacing + "px";
    id.style.fontWeight = setting.txtWeight;
  });
  return countdown;
})();
new countdown(document.querySelector("#timer"), {
  datetime: set.datetime,
  posX: set.posX,
  posY: set.posY,
  txtColor: set.txtColor,
  txtSize: set.txtSize,
  txtSpacing: set.txtSpacing,
  txtWeight: set.txtWeight,
  secondDisplay: set.secondDisplay,
});
