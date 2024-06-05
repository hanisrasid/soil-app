export function saveToLocalStorage(key, data) {
    data = JSON.stringify(data)

    window.localStorage.setItem(key, data)
}

export function getFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key))
}