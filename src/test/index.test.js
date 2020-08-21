import {getFormattedViews, getFormattedDate} from "../utils/getFormat";
import  authReducer from "../reducers/authReducer";
import  errorReducere from "../reducers/errorReducer";
import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "../actions/types";
import errorReducer from "../reducers/errorReducer";
test('format_view', () => {
    expect(getFormattedViews(0)).toBe(0);
    expect(getFormattedViews(420)).toBe(420);
    expect(getFormattedViews(1000)).toBe("1N");
    expect(getFormattedViews(1200)).toBe("1N");
    expect(getFormattedViews(1200)).toBe("1N");
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