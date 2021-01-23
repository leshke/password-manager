import { useEffect, useState } from "react";

// export const useLocalStorage = (key, initialValue) => {

//     const [storedValue, setStoredValue] = useState(() => {
//         const item = window.localStorage.getItem(key);
//         return item ? JSON.parse(item) : initialValue;
//     });

//     const setValue = (value) => {
//         const valueToStore = value instanceof Function ? value(storedValue) : value;
//         setStoredValue(valueToStore);
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     };

//     return [storedValue, setValue];
// }

export const useLocalStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [value, setValue] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
