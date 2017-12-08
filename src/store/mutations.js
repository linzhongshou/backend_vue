/* eslint-disable */
export default {
    setUser (state, user) {
        state.user = user
        window.sessionStorage.setItem("user", user)
    }
}