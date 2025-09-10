import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/app/common/Axios/client";
import { loginRequest, loginSuccess, loginFailure } from "../../reducers/auth";

function* loginSaga(action: ReturnType<typeof loginRequest>): any {
  try {
    const response = yield call(api.post, "/auth/login", action.payload);
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
