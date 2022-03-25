export const getLocalstorage = (name, defaultValue) => {
    try {
        const serializedState = localStorage.getItem(name);

        if (serializedState === null) {
            return defaultValue;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return defaultValue;
    }
};

export const setLocalstorage = (name, state) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem(name, serializedState);
    } catch {
        return undefined;
    }
};

export const deleteLocalstorage = (name) => {
    try {
        localStorage.removeItem(name);
    } catch {
        return undefined;
    }
};
