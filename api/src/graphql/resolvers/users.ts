import {getUsers,login,register} from "../../controllers/users"

export = {
    Query:{
       getUsers 
    },
    Mutation: {
      login,
      register
    }
}