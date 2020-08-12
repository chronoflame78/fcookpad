const getFormattedViews = (views) => {
    let formattedViews = views;
    let flag = true;
    switch (flag) {
      case views >= 100000:
        formattedViews = String(views).slice(0, 1) + "N";
        break;
      case views >= 10000:
        formattedViews = String(views).slice(0, 2) + "N";
        break;
      case views >= 1000:
        formattedViews = String(views).slice(0, 3) + "N";
        break;
    }
    return formattedViews;
}

export { getFormattedViews };