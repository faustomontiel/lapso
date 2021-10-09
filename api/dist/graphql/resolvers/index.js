"use strict";
const usersResolvers = require('./users');
module.exports = {
    Query: Object.assign({}, usersResolvers.Query),
    Mutation: Object.assign({}, usersResolvers.Mutation)
};
