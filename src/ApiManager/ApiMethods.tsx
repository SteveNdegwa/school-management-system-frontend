import api from "../config/api";


class ApiMethods {
    static apiRequest(method: string, url: string, body: object = {}){
        return new Promise((resolve, reject) => {
            api
                .request({
                    method: method,
                    url: url,
                    data: body
                })
                .then((response) => {
                    response.data.code == '100.000.000' ? resolve(response.data) : reject(response.data.error)
                })
                .catch((err) => {
                    console.log(err)
                    reject('An error occurred')
                });
        });
    }

    static get(url: string){
        return this.apiRequest('GET', url)
    }

    static post(url: string, data: object){
        return this.apiRequest('POST', url, data)
    }
    
    static put(url: string, data: object){
        return this.apiRequest('PUT', url, data)
    }

    static delete(url: string, data: object){
        return this.apiRequest('DELETE', url, data)
    }
}

export default ApiMethods

