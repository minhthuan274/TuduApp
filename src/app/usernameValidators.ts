import { FormControl } from '@angular/forms';

export class UsernameValidators {

  static shouldBeUnique(fControl: FormControl){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fControl.value == "thuan")
          return resolve({ shouldBeUnique: true });
        else
          return resolve(null);
      }, 3000)
    })
  }

  static cannotContainSpace(fControl: FormControl){
    if (fControl.value.indexOf(' ') >= 0)
      return { cannotContainSpace: true };
    return null;   
  }
}