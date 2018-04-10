"use strict"
import axios from 'axios';
// GET A BOOK
export function sendContactMail(mailData) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            axios.post("/api/contact", mailData)
                .then(function (response) {
                    if (response.data.success) {
                        dispatch({ type: "SEND_CONTACT_MAIL", payload: response.data })
                        resolve();
                    } else {
                        dispatch({ type: "SEND_CONTACT_MAIL_REJECTED", payload: response.data })
                        reject();
                    }

                })
                .catch(function (err) {
                    dispatch({ type: "SEND_CONTACT_MAIL_REJECTED", payload: err })
                    reject();
                })
        })

    }
}