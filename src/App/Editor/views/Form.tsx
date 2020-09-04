import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from 'components';
import { State } from 'store/types';
import * as actions from '../actions';
import './Form.css';

interface FormProps {
  token?: string;
}
const NameForm: FC<FormProps> = ({ token = '' }) => {
  const dispatch = useDispatch();
  const editor = useSelector((state: State) => state.subApp.editor);

  const { name, lastname, address, submitPending } = editor;

  return (
    <div>
      <TextField
        className="form__field"
        size="s"
        value={name}
        placeholder="Name"
        onChange={(value: string) => dispatch(actions.changeEditorName(value))}
      />
      <TextField
        className="form__field"
        size="s"
        value={lastname}
        placeholder="Lastname"
        onChange={(value: string) => dispatch(actions.changeEditorLastname(value))}
      />
      <TextField
        className="form__field"
        size="s"
        value={address}
        placeholder="Address"
        onChange={(value: string) => dispatch(actions.changeEditorAddress(value))}
      />
      <Button
        label="Submit"
        size="s"
        onClick={() => dispatch(actions.submitEditorForm(token))}
        disabled={submitPending}
        pending={submitPending}
      />
    </div>
  );
};

export default NameForm;
