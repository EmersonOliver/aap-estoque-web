import { throwError } from 'rxjs';

export class ErrorHandler {

  static handlerError(error: any) {
    console.log(error);
    // debugger;
    let errorMessage = 'Serviço Indísponivel';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      // console.log('errorHandler0' + JSON.stringify(error));
      errorMessage = error.error.message;
    }
    else if (error instanceof Response) {
      // console.log('errorHandler1' + JSON.stringify(error));
      errorMessage = error.text.toString();
    }
    else if (error != undefined) {
      // debugger;
      // server-side error
      // console.log('errorHandler2' + JSON.stringify(error));
      if (error.status == 0) {
        errorMessage = 'Error Processing';
      }
      else if (error.status == 0 || error.status == 404 || error.status == 504) {
        errorMessage = 'Serviço Indísponivel';
      }
     else if(error.status == 403 || error.status == 401){
       errorMessage = 'Não Autorizado';
     }else if(error.status == 302){
       errorMessage = error.error.message;
     }
      else if (error.error != undefined && error.error.message != undefined && error.error.message != '') {
        errorMessage = error.error.message;
      }
      else if (error.error != undefined && error.error != '') {
        errorMessage = error.error;
      }
      // else {
      //   errorMessage = error.message;
      // }
    }
    return throwError(errorMessage);
  }
}
