import { LightningElement, api } from "lwc";
import saveTask from "@salesforce/apex/ToDoController.saveTask";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class TaskEditor extends NavigationMixin(LightningElement) {
  @api isAction;

  taskValue;
  dueDate = new Date(Date.now()).toISOString();

  showDate = false;
  showSaveBtn = false;

  handleInputChange(event) {
    this.taskValue = event.detail.value;
    this.taskValue === "" ? (this.showDate = false) : (this.showDate = true);
  }

  handleDateChange(event) {
    this.dueDate = event.detail.value;
    this.dueDate === "" || this.isAction
      ? (this.showSaveBtn = false)
      : (this.showSaveBtn = true);
  }

  handleClick() {
    console.log("Save btn clicked");
    saveTask({ task: this.taskValue, dueDate: this.dueDate })
      .then((result) => {
        if (result != "") {
          this[NavigationMixin.GenerateUrl]({
            type: "standard__recordPage",
            attributes: {
              recordId: result,
              actionName: "view",
            },
          }).then((url) => {
            const event = new ShowToastEvent({
              title: "Success!",
              message: "new Record Task created! See it {0}!",
              messageData: [
                {
                  label: "here",
                  url,
                },
              ],
              variant: "success",
            });
            this.dispatchEvent(event);
          });
          this.taskValue = "";
          this.dueDate = "";
          this.showDate = false;
          this.showSaveBtn = false;
        }
      })
      .catch((error) => {
        const event = new ShowToastEvent({
          title: "Error",
          message: error.body.message,
          variant: "error",
        });
        this.dispatchEvent(event);
      });
  }

  @api
  handleActionClick() {
    this.handleClick();
  }
}
