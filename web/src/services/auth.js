import api from '../services/api'

export const logIn = async(data) => {

    const {log, password} = data;

    const response = await api.post('user/auth', { log, password });

    const {
        level
    } = response.data.user

    const path = level == "1" ? "default" : level == "999" ? "adm" : 0

    return path;
};


// .then(response =>{
//     // localStorage.setItem('user', resp.data.user.id);
//     // api.put(`/user/online/${resp.data.user.id}`, {online: "0"})
//     const data = response.data.user.level;
//     const token = "jf942hjf984y3rf98735hqgf98u43gf"
//     if(data === "1") {
//         console.log('1')
//         return  "1";
//     } else if(data === "999") {
//         console.log('999')
//         return  "999";
//     }