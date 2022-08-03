
// generate 4 alphanumeric code
export const getCode = async () => {
    const numbers = '0123456789';

    const chars = 'abcdefghijklmnopqrstuvwxyz';

    const code_length = 4;
    let number_count = 2;
    let letter_count = 2;

    let code = '';

    for (let i = 0; i < code_length; i++) {
            const letterOrNumber = Math.floor(Math.random() * 2);
            if ((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
                    letter_count--;
                    const rnum = Math.floor(Math.random() * chars.length);
                    code += chars[rnum];
            } else {
                    number_count--;
                    const rnum2 = Math.floor(Math.random() * numbers.length);
                    code += numbers[rnum2];
            }
    }
    return code;
};

