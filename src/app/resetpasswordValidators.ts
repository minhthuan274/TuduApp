import { FormGroup, FormControl } from '@angular/forms';

export class ResetPasswordValidators {
    static shouldBeMatched(group: FormGroup) {
        var newPassword = group.controls['newPassword'];
        var confirmPassword = group.controls['confirmPassword'];
        console.log(newPassword);
        if (newPassword.value == confirmPassword.value) 
            return null;
        return { shouldBeMatched: true };
    }
}