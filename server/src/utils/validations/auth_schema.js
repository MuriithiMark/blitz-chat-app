const loginSchema = {
    username: {
        notEmpty: {
            errorMessage: "username cannot be empty"
        },
        isString: {
            errorMessage: "username must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "username must be between 4 and 20 characters"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isString: {
            errorMessage: "password must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "password must be between 4 and 20 characters"
        }
    },
}

const registerSchema = {
    ...loginSchema,
    email: {
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isString: {
            errorMessage: "email must be a string"
        },
        isEmail: {
            errorMessage: "email is invalid"
        },
    }
}

export {
    loginSchema,
    registerSchema,
}