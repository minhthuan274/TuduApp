import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'errorMessages' })

export class ErrorMessagesPipe implements PipeTransform {
  transform(value: Object): Array<string> {
    if (Array.isArray(value)) { return value; }

    return this.parseErrorObject(value);
  }

  private parseErrorObject(value: Object): Array<string> {
    let errors = [];
    for (let key in value) {
      if (this.knownErrors()[key]) {
        let error_messages = this.knownErrors()[key].call(this, value[key]);
        errors = errors.concat(error_messages);
      }
    }
    return errors;
  }

  private knownErrors(): Object {
    return {
      'pattern': this.patternError,
      'minlength': this.minLengthError,
      'maxlength': this.maxLengthError,
      'required': this.requiredError,
      'full_messages': this.fullMessages,
      'cannotContainSpace': this.cannotContainSpace,
    };
  }

  private cannotContainSpace(_error): string {
    return 'This field cannot contain spaces';
  }

  private patternError(error): string {
    return `Must match /${error['requiredPattern']}/ pattern`;
  }

  private maxLengthError(error): string {
    return `Must be shorter than ${error['requiredLength'] + 1}`;
  }

  private minLengthError(error): string {
    return `Must be longer than ${error['requiredLength'] - 1}`;
  }

  private requiredError(_error): string {
    return 'This field is required';
  }

  private fullMessages(error): Array<string> {
    return error;
  }
}