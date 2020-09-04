import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';
import { sleep } from '@modusbox/modusbox-ui-components/dist/utils/async';
import { SUBMIT_EDITOR_FORM } from './types';
import { setSubmitError, setSubmitResponse } from './actions';

function* submitFormSaga(action: PayloadAction<string>) {
  try {
    yield sleep(1000);

    const response = yield axios({
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: {
        authentication: `bearer ${action.payload}`,
      },
    });
    yield put(setSubmitResponse(response.data));
  } catch (e) {
    yield put(setSubmitError(e.nessage));
  }
}

export function* SubmitFormSaga(): Generator {
  yield takeLatest(SUBMIT_EDITOR_FORM, submitFormSaga);
}

export default function* rootSaga(): Generator {
  yield all([SubmitFormSaga()]);
}
