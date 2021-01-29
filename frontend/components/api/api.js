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
    archive_req(id) {
        return post('/api/archive_req', {id: id})
    },
    unarchive_req(id) {
        return post('/api/unarchive_req', {id: id})
    },
    analyze_req(id) {
        return post('/api/analyze_req', {id: id})
    },
    delete_req(id) {
        return post('/api/delete_req', {id: id})
    },
    create_req(status, title, archived, analysis, is_trash, team, priority, category, link, description){
        return post('/api/create_req', 
        {status: status, title: title, archived: archived, analysis: analysis, is_trash: is_trash, team: team, priority: priority, category: category, link: link, description: description
            })
    },
    update_req_status(id, status) {
        return post('/api/update_req_status', {id: id, status: status})
    },
    update_req_index(id, index) {
        return post('/api/update_req_index', {id: id, index: index})
    },
    update_req_prop(id, prop, value) {
        return post('/api/update_req_prop', {id: id, prop: prop, value: value})
    }
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
