"use strict"

// CART REDUCERS
export function contactReducers(state = {}, action) {
    switch (action.type) {
        case "SEND_CONTACT_MAIL":
            return {
                ...state,
                success: action.payload
            }
            break;
        case "SEND_CONTACT_MAIL_REJECTED":
            return {
                ...state,
                error: action.payload
            }
            break;
        default:
            return state
    }
}