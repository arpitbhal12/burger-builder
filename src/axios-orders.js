import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-e324f-default-rtdb.firebaseio.com/"
})

export default instance;
