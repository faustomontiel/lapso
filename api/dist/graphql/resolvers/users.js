"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const apollo_server_1 = require("apollo-server");
const config_1 = __importDefault(require("../../config"));
const validators_1 = require("../../utils/validators");
module.exports = {
    Query: {
        getUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield User_1.default.find();
            });
        }
    },
    Mutation: {
        register(parent, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { valid, errors } = (0, validators_1.validateRegisterInput)(username, email, password, confirmPassword);
                if (!valid) {
                    console.log(valid);
                    throw new apollo_server_1.UserInputError('Errors', errors);
                }
                const user = yield User_1.default.findOne({ username });
                if (user) {
                    throw new apollo_server_1.UserInputError('Username is taken', {
                        errors: {
                            username: 'This username is taken'
                        }
                    });
                }
                password = yield bcryptjs_1.default.hash(password, 12);
                const newUser = new User_1.default({ email, username, password });
                const res = yield newUser.save();
                const token = jsonwebtoken_1.default.sign({
                    id: res.id,
                    email: res.email,
                    username: res.username
                }, config_1.default.JWT_SECRET_KEY, { expiresIn: '1h' });
                return {
                    email: res.email,
                    username: res.username,
                    id: res._id,
                    token
                };
            });
        }
    }
};
