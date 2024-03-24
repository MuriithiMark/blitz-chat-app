const newGroupSchema = {
    name: {
        notEmpty: {
            errorMessage: "name cannot be empty"
        },
        isString: {
            errorMessage: "name must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 20
            },
            errorMessage: "name must be between 4 and 20 characters"
        }
    },
    about: {
        notEmpty: {
            errorMessage: "about cannot be empty"
        },
        isString: {
            errorMessage: "about must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 200
            },
            errorMessage: "about must be between 4 and 200 characters"
        }
    },
}

export {
    newGroupSchema
}