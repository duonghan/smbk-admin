import { call, all, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fromJS } from 'immutable';
import { setAuthToken } from 'utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { push } from 'connected-react-router/immutable';
import { SIGNIN_GUEST, SIGNIN_REQUEST, SIGNOUT_REQUEST } from './constants';
import { signInFailed, setCurrentUser, signoutSuccess } from './actions';

function* doSignOut() {
  // remove token from Cookies
  Cookies.remove('token');

  // remove auth header for future request
  setAuthToken(false);

  // set current user to empty object
  yield put(signoutSuccess());
  yield put(push('/'));
}

function* doSignIn(userData) {
  try {
    const res = yield call(axios.post, '/api/users/login', userData.payload);
    const { token } = res.data;

    // handleUpdate to cookies
    // if user check remember session, set expire cookie in 1w
    if (userData.payload.isRemember) {
      Cookies.set('token', token, { expires: 7 });
    } else {
      Cookies.set('token', token);
    }

    // set token to Auth header
    setAuthToken(token);

    // decode token to get user data
    const plainData = jwtDecode(token);
    // set current user
    yield put(setCurrentUser(plainData));
  } catch (err) {
    yield put(signInFailed(fromJS(err.response.data)));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(SIGNIN_REQUEST, doSignIn),
    takeLatest(SIGNIN_GUEST, doSignIn),
    takeLatest(SIGNOUT_REQUEST, doSignOut),
  ]);
}
