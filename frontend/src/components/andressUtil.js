import axios from 'axios'

const viaCepUrl = 'https://viacep.com.br/ws/'

export default function getAndress(cep) {
    
    const url = viaCepUrl + cep + '/json/'
    const data = {};
    
return axios(url).then(resp =>{
        return resp.data;
    }).catch( resp => {
        return {};
    }) 
};