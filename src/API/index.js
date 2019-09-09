import apiAddress from '../API/destination';
import _ from 'lodash';

export const fetchApi = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {

    
    let message = '';
    if(strMethod.toUpperCase() === 'GET'){
        message = undefined;
    }else{
        message = JSON.stringify(payload)
    }

    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    console.log('endPoint: ' + apiAddress.url + endPoint + "    body: " + message + " method: " + strMethod + "  headers: " + JSON.stringify(header));
    return fetch(apiAddress.url + endPoint,{
        method: strMethod.toUpperCase(),
        headers: header,
        body: message
    })
	.catch((e) => {
        console.log('ERROR RESPONSE: ', e)
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
            });
		} else {
            throw e;
		}
	});
}

//fetch for UPLOAD

export const fetchUploadAPI = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {

    console.log(apiAddress.url + endPoint, ' body: ', payload, '  method:  ', strMethod)
    return fetch(apiAddress.url + endPoint,{
        method: strMethod.toUpperCase(),
        headers: {'Accept': 'application/json'},
        body: payload
    })
	.catch((e) => {
        console.log('ERROR RESPONSE: ', e)
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
            });
		} else {
            throw e;
		}
	});
}

export const mockFetch = (endPoint, payload = {}, strMethod = 'post', headers = {}, dummy = false) => {

    if(dummy){
        return(
            JSON.stringify({"id":"1","login":{"username":"zxcv11.john@gmail.com","password":"thisisjct","flag":true}})
        );

    }
    else{
        let oBody = '';
        if(strMethod.toUpperCase() === 'GET'){
            oBody = undefined;
        }else{
            oBody = JSON.stringify(
                payload)
        }
    

        return fetch(apiAddress.url + endPoint,{
            method: strMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: oBody
        })
        .catch((e) => {
            if (e.response && e.response.json) {
                e.response.json().then((json) => {
                    if (json) throw json;
                    throw e;
                });
            } else {
                throw e;
            }
        });
    }

}


// ^^^^ ORIGINAL API ^^^^

// export const fetchApi = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {

//     const accessToken = '7b456b1b73ed958cfca19167cf6abdaf'; // sample only
    
//     let message = '';
//     if(strMethod.toUpperCase() === 'GET'){
//         message = undefined;
//     }else{
//         message = JSON.stringify(payload)
//     }

//     console.log('endPoint: ' + apiAddress.url + endPoint);
//     return fetch(apiAddress.url + endPoint,{
//         method: strMethod,
//         headers: _.pickBy({
// 			...(accessToken ? {
// 				Authorization: `Bearer ${accessToken}`,
// 			} : {
// 				'Client-ID': apiAddress.clientId,
// 			}),
// 			...headers,
//         }, item => !_.isEmpty(item)),
//         body: message
//     })
// 	.catch((e) => {
// 		if (e.response && e.response.json) {
// 			e.response.json().then((json) => {
// 				if (json) throw json;
// 				throw e;
//             });
// 		} else {
//             throw e;
// 		}
// 	});
// }