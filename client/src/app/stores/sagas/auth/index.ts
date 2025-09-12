import { call, put, takeLatest } from "redux-saga/effects";
import { loginApi } from "@/app/lib/authApi";
import { loginFailure, loginRequest, loginSuccess } from "@/app/stores/reducers/authSlice";


function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: { data: { accessToken: string; user: { id: string; email: string } } } =
      yield call(loginApi, action.payload);

    yield put(loginSuccess(response.data));
  } catch (err: any) {
    yield put(loginFailure(err.response?.data?.message || err.message));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
