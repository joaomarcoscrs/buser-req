import axios from '~/helpers/axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const api = {
    login(username, password){
        return post('/api/login', {username: username, password: password});
    },
    logout(){
        return post('/api/logout');
    },
    whoami(){
        return get('/api/whoami');
    },
    list_users(){
        return get('/api/list_users');
    },
    list_reqs(){
        return get('/api/list_reqs');
    },
    list_reqs_analysis(){
        return get('/api/list_reqs_analysis');
    },
    list_archived_reqs(){
        return get('/api/list_archived_reqs');
    },
    update_reqs(reqs){
        return post('/api/update_reqs', {reqs});
    },
    archive_req(id) {
        return post('/api/archive_req', {id})
    },
    unarchive_req(id) {
        return post('/api/unarchive_req', {id})
    },
    analyze_req(id) {
        return post('/api/analyze_req', {id})
    },
    delete_req(id) {
        return post('/api/delete_req', {id})
    },
    create_req(status, title, archived, analysis, is_trash, team, priority, category, link, description){
        return post('/api/create_req', 
        {status, title, archived, analysis, is_trash, team, priority, category, link, description
            })
    },
    change_status(id, status) {
        return post('/api/change_status', {id, status})
    },
    update_req_index(id, index) {
        return post('/api/update_req_index', {id, index})
    },
}
export default api;

function get(url, params){
    return axios.get(url, {params: params});
}

function post(url, params){
    var fd = new FormData();
    params = params || {}
    Object.keys(params).map((k) => {
        fd.append(k, params[k]);
    })
    return axios.post(url, fd);
}
