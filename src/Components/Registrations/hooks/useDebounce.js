import { useEffect } from 'react';

let inFirstTime = false;

/**
 * 
 * @param {function} func função executada ao fim do delay
 * @param {array<string>} values array de dependências
 * @param {number} time tempo do delay
 * @param {boolean} delayInFirstTime informa se deve haver delay na primeira renderização
 */
export const useDebounce = (func, values, time = 500, delayInFirstTime = false) => {

    useEffect(() => {
        inFirstTime = delayInFirstTime;

        if (!inFirstTime) {
            func();
            inFirstTime = true;
            return;
        }

        const debouncing = setTimeout(() => func(), time);
        return () => clearTimeout(debouncing);
    }, values);

};