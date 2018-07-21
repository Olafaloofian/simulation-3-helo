const initialState = {
    username: "",
    id: "",
    profile_pic: ""
}

const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
const CLEAR = 'CLEAR'

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER_INFO:
            return {...state, username: action.payload.username, id: action.payload.id, profile_pic:action.payload.profile_pic}

        case CLEAR:
            return {...state, username: action.payload.username, id: action.payload.id, profile_pic:action.payload.profile_pic}

        default: return state
    }
}

export function updateUser(username, id, profile_pic) {
    return {
        type: UPDATE_USER_INFO,
        payload: {
            username: username,
            id: id,
            profile_pic: profile_pic
        }
    }
}

export function clearRedux() {
    return {
        type: CLEAR,
        payload: {
            username: "",
            id: "",
            profile_pic: ""
        }
    }
}