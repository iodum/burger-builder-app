import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d0fe8.firebaseio.com/'
});

export default instance;
