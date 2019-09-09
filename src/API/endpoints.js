// export const login = {
// 	get: function(payload){
// 		return(
// 			  'login'
// 		)
//     },
//     post: function(payload){
//         return(
//             'login/username=' + payload.username + '&password=' + payload.password
//         )
//     }
// }




// LOGIN ENDPOINTS

export const login = {
    get: function(){
        return(
            'login'
        )
    },
    post: function(){
        return(
            'newlogin'
        )
    },
    test: function(){
        return(
            'newlogin'
        );
    }
}

// REGISTER ENDPOINTS
export const register = {
    save: function() {
        return(
            'register'
        )
    },
    uploadProfilePicture: function() {
        return(
            'profile/picture_upload'
        )
    },
    uploadCoverPhoto: function() {
        return(
            'profile/cover_upload'
        )
    }
}

// picture endpoints 
export const picture = {
    cover: function(params) {
        return(
            'get/cover_base_path/' + params
        )
    },
    profile: function(params) {
        return(
            'get/profile_base_path/' + params
        )
    }
}

//server-side validation
export const validation = {
    email: function(){
        return(
            'validate/email'
        )
    }
}

// get all registered profiles
export const profiles = {
    all: function(){
        return(
            'profile/all'
        )
    },
    delete: function(){
        return(
            'delete/profile'
        )
    }
}