import { InputValidationError } from './input.validation.error';
// import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
export class Helper {
    // public static hash = (str: string) => {
    //     const salt = genSaltSync(8);
    //     const hashed = hashSync(str, salt);
    //     return hashed;
    // };

    // public static compare = (plainText: string, hashed: string) => {
    //     return compareSync(plainText, hashed);
    // };

    static handleValidationError = (result) => {
        let index = 1;
        const errorMessages = [];
        for (const er of result.errors) {
            errorMessages.push(` ${index}. ${er.msg} - <${er.value}> for <${er.param}> in ${er.location}`);
            index++;
        }
        throw new InputValidationError(errorMessages);
    };
}