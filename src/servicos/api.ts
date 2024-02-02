import axios from "axios";

 //criando conexão com a web api
const api = axios.create({
    baseURL: 'http://192.168.255.224:3000/'//endereço Ip da máquina pois o android studio vai precisar disto
});

export default api;