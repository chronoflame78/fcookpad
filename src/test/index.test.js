import {getFormattedViews, getFormattedDate} from "../utils/getFormat";
import  authReducer from "../reducers/authReducer";
import  errorReducer from "../reducers/errorReducer";
import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "../actions/types";

function getDateString(date) {
  var today = new Date(date);
  var month = "";
  if (today.getMonth() < 9) {
    month = "0" + (today.getMonth() + 1);
  } else {
    month = today.getMonth() + 1;
  }
  return (
    today.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
    "/" +
    month +
    "/" +
    today.getFullYear()
  );
}

test('format_view', () => {
    expect(getFormattedViews(0)).toBe(0);
    expect(getFormattedViews(1)).toBe(1);
    expect(getFormattedViews(420)).toBe(420);
    expect(getFormattedViews(999)).toBe(999);
    expect(getFormattedViews(1000)).toBe("1N");
    expect(getFormattedViews(1001)).toBe("1N");
    expect(getFormattedViews(1200)).toBe("1N");
    expect(getFormattedViews(1999)).toBe("1N");
    expect(getFormattedViews(2000)).toBe("2N");
    expect(getFormattedViews(5500)).toBe("5N");
    expect(getFormattedViews(9999)).toBe("9N");
    expect(getFormattedViews(10000)).toBe("10N");
    expect(getFormattedViews(15500)).toBe("15N");
    expect(getFormattedViews(19900)).toBe("19N");
    expect(getFormattedViews(200000)).toBe("200N");
    expect(getFormattedViews(1999999)).toBe("1Tr");
    expect(getFormattedViews(3400304)).toBe("3Tr");
    expect(getFormattedViews(45030304)).toBe("45Tr");
    expect(getFormattedViews(1573030304)).toBe("157Tr");
    expect(getFormattedViews(1573030304)).toBe("157Tr");
    expect(getFormattedViews(999999999)).toBe("999Tr");
  });

  test('format_date', () => {
    expect(getFormattedDate("2017-31-12T07:28:45.167Z")).toBe("31/12/2017");
    expect(getFormattedDate("2018-12-12T07:28:45.167Z")).toBe("12/12/2019");
    expect(getFormattedDate("2016-01-01T07:28:45.167Z")).toBe("01/01/2016");
    expect(getFormattedDate("2019-07-19T07:28:45.167Z")).toBe("19/07/2019");
    expect(getFormattedDate("2019-07-19T07:28:45.167Z")).toBe("19/07/2019");
    expect(getFormattedDate("2020-06-19T07:28:45.167Z")).toBe("19/06/2020");
    expect(getFormattedDate("2020-07-19T07:28:45.167Z")).toBe("1 tháng trước");
    expect(getFormattedDate("2020-08-19T07:28:45.167Z")).toBe("2 ngày trước");
    expect(getFormattedDate("2020-08-19T16:28:45.167Z")).toBe("1 ngày trước");
    expect(getFormattedDate("2020-08-10T07:28:45.167Z")).toBe("10/08/2020");
    expect(getFormattedDate("2020-08-21T07:28:45.167Z")).toBe("2 giờ trước");
  });

  test('auth_reducer', () => {
    expect(authReducer({
      isAuthenticated: false,
      user: {}
    }, {
      type: SET_CURRENT_USER,
      payload: {}
    })).toStrictEqual({
      isAuthenticated: false,
      user: {}
    });

    expect(authReducer({
      isAuthenticated: false,
      user: {}
    }, {
      type: SET_CURRENT_USER,
      payload: {user_id: "_021312321098ewsdwq923",userName:"Nhat Nguyen"}
    })).toStrictEqual({
      isAuthenticated: true,
      user: {user_id: "_021312321098ewsdwq923",userName:"Nhat Nguyen"}
    });

    expect(errorReducer({
      isAuthenticated: false,
      user: {}
    }, {
      type: GET_ERRORS,
      payload: {message:"wrong username"}
    })).toStrictEqual({
      message:"wrong username"
    });
  });

  test('error_reducer', () => {
    expect(errorReducer({
      isAuthenticated: false,
      user: {}
    }, {
      type: GET_ERRORS,
      payload: {message:"wrong username"}
    })).toStrictEqual({
      message:"wrong username"
    });
  });

  test('format_date_inside', () => {
    expect(getDateString("2020-08-19T07:28:45.167Z")).toBe("19/08/2020");  
    expect(getDateString("2020-08-01T07:28:45.167Z")).toBe("01/08/2020");  
    expect(getDateString("2020-08-30T07:28:45.167Z")).toBe("30/08/2020");  
    expect(getDateString("2020-12-31T07:28:45.167Z")).toBe("31/12/2020");  
    expect(getDateString("2020-01-01T07:28:45.167Z")).toBe("01/01/2020");  
    expect(getDateString("2021-04-15T07:28:45.167Z")).toBe("15/04/2021");  
    expect(getDateString("2019-07-30T07:28:45.167Z")).toBe("30/07/2019");  
    expect(getDateString("2020-02-28T07:28:45.167Z")).toBe("28/02/2020");  
    expect(getDateString("2018-08-22T07:28:45.167Z")).toBe("22/08/2018");  
    expect(getDateString("1998-02-03T07:28:45.167Z")).toBe("03/02/1998");  
    expect(getDateString("1980-02-03T07:28:45.167Z")).toBe("03/02/1980"); 
    expect(getDateString("2022-04-04T07:28:45.167Z")).toBe("04/04/2022"); 
    expect(getDateString("2010-02-03T07:28:45.167Z")).toBe("03/02/2010"); 
    expect(getDateString("2015-12-31T07:28:45.167Z")).toBe("31/12/2015"); 
  });