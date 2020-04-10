import { AbstractControl } from '@angular/forms';
 
export class Passwordmatch {
    // Custom validator to check that two fields match.
    static matchPassword(ac: AbstractControl) {
        const pwd = ac.get('newPassword');
        const cnfpwd = ac.get('confirmPassword');
        if (pwd.value === cnfpwd.value) {
            return null;
        }
 
        ac.get('confirmPassword').setErrors({ mustMatch: true });
        return true;
    }
}