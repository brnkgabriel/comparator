import { constants } from "./constants";
import { iRemoteData, iToast } from "./types";
import { Util } from "./util"; 

export class Toast extends Util {

  private toast: HTMLElement;
  private toastMsg: HTMLElement;
  private toastBtn: HTMLElement;

  constructor(remoteData: iRemoteData, fbox: any) {
    super(remoteData, fbox)

    this.toast = this.el(constants.TOASTQUERY)
    this.toastMsg = this.el(constants.TOASTMSGQUERY)
    this.toastBtn = this.el(constants.TOASTBTNQUERY)

    this.toastBtn.addEventListener("click", () => {
      this.removeClasses()
      this.toast.classList.add("-hide")
    })
  }

  removeClasses() {
    this.toast.classList.remove("success")
    this.toast.classList.remove("error")
  }
  
  setMessage({ type, message }: iToast) {
    this.toast.classList.add(type)
    this.toastMsg.textContent = message
    this.toast.classList.remove("-hide")
    if (type === constants.SUCCESS) {
      setTimeout(() => {
        this.removeClasses()
        this.toast.classList.add("-hide")
      }, 5000)
    }
  }
}