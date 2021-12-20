export function removeStorageObject(key) {
    window.localStorage.removeItem(key);
}
export function getStorageObject(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
export function setStorageObject(key, item) {
    window.localStorage.setItem(key, JSON.stringify(item));
}
export function getAllStorage() {
    var storage = [];
    for(var i=0; i<window.localStorage.length; i++) {
        storage.push(getStorageObject(window.localStorage.key(i)));
    }
    return storage;
}
export function setSessionObject(key, item) {
    window.sessionStorage.setItem(key, JSON.stringify(item));
}
export function getSessionObject(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
}
export default {removeStorageObject,getStorageObject,setStorageObject,getAllStorage,setSessionObject,getSessionObject}
