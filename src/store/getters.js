/* eslint-disable */
export default {
    user: state => { if(!state.user) { state.user = window.sessionStorage.getItem("user") } return state.user }
}