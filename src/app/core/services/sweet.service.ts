import { Injectable, ɵConsole } from '@angular/core';
import swal from 'sweetalert2';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SweetService {
  noop = () => {};
  constructor() { }
  async showSwalError(titulo: string, mensajeError: string) {
    try {
      return await swal.fire({
        title: titulo,
        text: mensajeError,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'error'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSwalError2(mensajeError: string) {
    try {
      return await swal.fire({
        text: mensajeError,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'error'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSwalExito(titulo: string, mensajeError: string) {
    try {
      return await swal.fire({
        title: titulo,
        html: `<div style="font-size: 15px; font-family: 'Inter', sans-serif; color:#000000;">${mensajeError}</div>`,
        text: mensajeError,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'success'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSwalMsj(Mensaje: string) {
    try {
      return await swal.fire({
        title: 'Exitosa',
        text: Mensaje,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'success'
      });
    } catch (result) {
      return this.noop();
    }
  }

  showSwalQuestion(titulo: string, mensaje: string) {
    return swal.fire({
      title: titulo,
      text: mensaje,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: 'accent',
    });
  }
  async showSwalQuestionN(mensaje: string) {
    try {
      return await swal.fire({
        text: mensaje,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#84692C',
        cancelButtonColor: '#666666',
        icon: 'warning'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSwalQuestionN2(mensaje: string,idioma: string) {
    try {
      return await swal.fire({
        text: mensaje,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#84692C',
        cancelButtonColor: '#666666',
        icon: 'warning',
        reverseButtons: true,
        confirmButtonText: idioma == 'en' ? 'Confirm' : 'Confirmar ',
        cancelButtonText: idioma == 'en' ? 'Cancel' : 'Cancelar '
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showInfoSwalMsj(Mensaje: string) {
    try {
      return await swal.fire({
        title: 'Info',
        text: Mensaje,
        showConfirmButton: true,
        showCancelButton: true,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'info'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showInfoSwalMsjOK(Mensaje: string) {
    try {
      return await swal.fire({
        title: 'Info',
        text: Mensaje,
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonColor: '#84692C',
        icon: 'info'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSubmit(mensaje: string) {
    try {
      return await swal.fire({
        text: mensaje,
        showConfirmButton: true,
        showCancelButton: true,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        confirmButtonText: 'Submit',
        icon: 'warning'
      });
    } catch (result) {
      return this.noop();
    }
  }
  async showSubmitSave(mensaje: string) {
    try {
      return await swal.fire({
        text: mensaje,
        showConfirmButton: true,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'warning'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showRequiredFieldsMessage(mensaje: string) {
    try {
      return await swal.fire({
        text: mensaje,
        showConfirmButton: true,
        showCancelButton: false,
        customClass: {
          confirmButton: 'confirmBtnClass'
        },
        confirmButtonColor: '#84692C',
        icon: 'warning'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSwalQuestionR(titulo: string, mensaje: string) {
    try {
      return await swal.fire({
        title: titulo,
        text: mensaje,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonColor: '#666666',
        confirmButtonColor: '#84692C',
        confirmButtonText: 'Submit',
        icon: 'warning'
      });
    } catch (result) {
      return this.noop();
    }
  }

  async showSwalQuestionN3(mensaje: string) {
    try {
      return await swal.fire({
        text: mensaje,
        showConfirmButton: true,
        confirmButtonColor: '#84692C',
        icon: 'warning',
        reverseButtons: true,
        confirmButtonText: 'OK',
      });
    } catch (result) {
      return this.noop();
    }
  }
}
