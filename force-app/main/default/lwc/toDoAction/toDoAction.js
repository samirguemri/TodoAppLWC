import { LightningElement } from "lwc";
import { CloseActionScreenEvent } from "lightning/actions";

export default class ToDoAction extends LightningElement {
  isAction = true;

  handleCancelClick() {
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  handleSaveClick() {
    this.refs.taskEditor.handleActionClick();
  }
}
