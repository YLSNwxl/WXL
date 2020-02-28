// pages/cal/cal.js
const app = getApp();
Page({
  data: {
    result: "0",
    id1: "clear",
    id2: "back",
    
    id4: "div",
    id5: "mul",
    id6: "sub",
    id7: "add",
    id8: "dot",
    id9: "eql",
    id10: "num_0",
    id11: "num_1",
    id12: "num_2",
    id13: "num_3",
    id14: "num_4",
    id15: "num_5",
    id16: "num_6",
    id17: "num_7",
    id18: "num_8",
    id19: "num_9",
    buttonDot: false,
  },
  clickButton: function (e) {
    console.log(e);
    var buttonVal = e.target.id;
    var res = this.data.result;
    var newbuttonDot = this.data.buttonDot;
    var sign;
    if (buttonVal >= "num_0" && buttonVal <= "num_9") {
      var num = buttonVal.split('_')[1];
      if (res == "0" || res.charAt(res.length - (length - 1)) == "=") {
        res = num;
      }
      else {
        res = res + num;
      }
    }
    else {
      if (buttonVal == "dot") {
        if (!newbuttonDot) {
          res = res + '.';
        }
      }
      else if (buttonVal == "clear") {
        res = '0';
      }
      else if (buttonVal == "back") {
        var length = res.length;
        if (length > 1) {
          res = res.substr(0, length - 1);
        }
        else {
          res = '0';
        }
      }
      else if (buttonVal == "div" || buttonVal == "mul" || buttonVal == "sub" || buttonVal == "add") {
        switch (buttonVal) {
          case "div":
            sign = '÷';
            break;
          case "mul":
            sign = '×';
            break;
          case "sub":
            sign = '-';
            break;
          case "add":
            sign = '+';
            break;
        }
        if (!isNaN(res.charAt(res.length - 1))) {
          res = res + sign;
        }
      }
    }
    this.setData({
      result: res,
      buttonDot: newbuttonDot,
    });
  },
  equal: function (e) {
    var str = this.data.result;
    var item = '';
    var strArray = [];
    var temp = 0;
    for (var i = 0; i <= str.length; i++) {
      var s = str.charAt(i);
      if ((s != '' && s >= '0' && s <= '9') || s == '.') {
        item = item + s;
      }
      else {
        strArray[temp] = item;
        temp++;
        strArray[temp] = s;
        temp++;
        item = '';
      }
    }
    if (isNaN(strArray[strArray.length - 1])) {
      strArray.pop();
    }
    var num;
    var res = strArray[0] * 1;
    for (var i = 1; i <= strArray.length; i = i + 2) {
      num = strArray[i + 1];
      switch (strArray[i]) {
        case "-":
          res = res - num;
          break;
        case "+":
          res = res + num;
          break;
        case "×":
          res = res * num;
          break;
        case "÷":
          if (num != '0') {
            res = res / num;
          }
          else {
            res = '∞';
            break;
          }
          break;
      }
    }
    this.setData({
      result: '=' + res,
    });
  },
  time: function (e) {
    var util = require("../../utils/util.js");
    var time = util.formatTime(new Date());
    this.setData({
      result: time
    });
  }

})