
export const BASE_URL = 'http://localhost:5000/api/v1'
export const BASE_URL_SOCKET = 'http://localhost:5000'

const DEFAULT_HEADERS = {
    Accept:'application/json',
    'Content-Type':'application/json'
}

export const handleResponse = (res) =>{
    if(!res.ok) throw res
    return res.json()
}

export const socketErrorHandler = (error) => {
    if(error) alert(error)
}

export const fetchUserChatsInfo = (id) =>{
    return fetch(BASE_URL + `/channels/user_channels/${id}`)
        .then(handleResponse)
}

export const fetchMoreMessagesInChat = (channel,page) =>{
    return fetch(BASE_URL +`/channels/${channel}?limit=50&page=${page+1}`)
        .then(handleResponse)
}


export const fetchUserIDbyUsername = (username) => {
    return fetch(BASE_URL + `/users/find/${username}`)
        .then(handleResponse)
}

export const createChannel = (body) =>{
    const options = {
        method:'POST',
        headers:DEFAULT_HEADERS,
        body:JSON.stringify(body)
    }
    return fetch(BASE_URL +'/channels',options)
        .then(handleResponse)
}