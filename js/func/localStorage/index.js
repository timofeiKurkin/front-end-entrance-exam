export const setLocalStorageValue = (key, value) => {
    try {
        if (typeof window === "undefined") {
            return;
        }

        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
};

export const getLocalStorageValue = (key, defaultValue) => {
    if (typeof window === "undefined") {
        return defaultValue;
    }

    const value = localStorage.getItem(key);

    if ((value.startsWith("{") && value.endsWith("}")) || (value.startsWith("[") && value.endsWith("]"))) {
        try {
            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    }

    return value || defaultValue;
};

export const keyExistsInLocalStorage = key => {
    if (typeof window === "undefined") {
        return false;
    }

    return localStorage.getItem(key) !== null;
};

export const getValueOrSetDefault = (key, defaultValue) => {
    if (!keyExistsInLocalStorage(key)) {
        setLocalStorageValue(key, defaultValue);
        return defaultValue;
    }

    return getLocalStorageValue(key, defaultValue);
};

export const getKeysWithPrefix = prefix => {
    const res = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            res.push(key);
        }
    }

    return res;
};

export const getListOfValuesOrDefault = (key, defaultValue) => {
    const keys = getKeysWithPrefix(key);

    const educationData = [];

    if (!keys.length) {
        defaultValue.forEach(item => {
            educationData.push(getValueOrSetDefault(key + "-" + item.id, item));
        });
    } else {
        keys.forEach(key => {
            educationData.push(getLocalStorageValue(key, {}));
        });
    }

    return educationData;
};
