export function clearLocalStorage() {
    ['access_token', 'refresh_token'].forEach(key => {
        localStorage.removeItem(key)
    })
}

export function getToken(tokenType) {
    return localStorage.getItem(tokenType)
}
