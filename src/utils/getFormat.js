import timediff from "timediff";

const getFormattedViews = (views) => {
  let formattedViews;
  let flag = true;
  switch (flag) {
    case views >= 100000000:
      formattedViews = String(views).slice(0, 3) + " Tr";
      break;
    case views >= 10000000:
      formattedViews = String(views).slice(0, 2) + " Tr";
      break;
    case views >= 1000000:
      formattedViews = String(views).slice(0, 1) + " Tr";
      break;
    case views >= 100000:
      formattedViews = String(views).slice(0, 3) + " N";
      break;
    case views >= 10000:
      formattedViews = String(views).slice(0, 2) + " N";
      break;
    case views >= 1000:
      formattedViews = String(views).slice(0, 1) + " N";
      break;
    default:
      formattedViews = views;
      break;
  }
  return formattedViews;
};

const getFormattedDate = (date) => {
  var postDay = new Date(date);
  let today = new Date();
  var month = "";
  let timeVal = "";
  let timeDiff = timediff(date, today, "DHmS");
  let flag = true;
  if (postDay.getMonth() < 9) {
    month = "0" + (postDay.getMonth() + 1);
  } else {
    month = postDay.getMonth() + 1;
  }

  switch (flag) {
    case timeDiff.days > 7:
      timeVal =
        postDay.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
        "/" +
        month +
        "/" +
        postDay.getFullYear();
      break;
    case timeDiff.days > 0:
      timeVal = timeDiff.days + " ngày trước";
      break;
    case timeDiff.hours > 0:
      timeVal = timeDiff.hours + " giờ trước";
      break;
    case timeDiff.minutes > 0:
      timeVal = timeDiff.minutes + " phút trước";
      break;
    case timeDiff.seconds > 0:
      timeVal = timeDiff.seconds + " giây trước";
      break;
    default:
      timeVal = "Vừa xong";
      break;
  }
  return timeVal;
};

export { getFormattedViews, getFormattedDate };
