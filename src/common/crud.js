import axios from './axios'
class Crud {
    constructor(){
        this.baseUrl = '/'
    }

    setBaseUrl(baseUrl){
        this.baseUrl = baseUrl
        return this
    }

    index(){
        return axios.get(this.baseUrl + '/index')
    }

    save(form){
        return axios.post(this.baseUrl + '/save',form)
    }

    update(form){
        return axios.put(this.baseUrl + '/update',form)
    }

    delete(ids){
        if (ids instanceof Array){
            ids = ids.join(',')
        }
        return axios.delete(this.baseUrl + '/delete?ids=' + ids)
    }

    uploadFile(file){
        console.log(file)
    }
}

export default new Crud()