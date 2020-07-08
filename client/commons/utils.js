export function clearLocalStorage() {
    ["access_token", "refresh_token", "user_info", "user_id"].forEach((item) => {
        localStorage.removeItem(item)
    })
}

export function getToken(tokenType) {
    return localStorage.getItem(tokenType)
}
