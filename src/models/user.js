import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    /**
     * @typedef {Object<string, any>} UserInfo
     * @property {string} email
     * @property {string} password
     * @property {string} firstName
     * @property {string} lastName
     * @property {boolean} isAdmin
     */

    // https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#18d5
    const saltFactor = 10;
    // This gotta be changed at some point
    const tokenSecret = "TwoThumbsUp!";

    // --------------------- GET METHODS ---------------------------------

    /**
     * Finds the user with the given email
     * @param {string} email
     * @returns {Promise<User | null> | null}
     */
    User.findUser = async (email) =>
        User.findOne(
            {where: {
                email
                }}
        );

    /**
     * Checks if the a user already exists with the given email
     * @param {string} email
     * @returns {Promise<boolean>}
     */
    User.emailExists = async (email) =>
        User.findOne({where: {email}})
            .then(result => result !== null);


    User.loginUser = async (email, password) => {
        try {
            const user = await User.findUser(email);
            if (user) {
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password,
                        async (err, same) => {
                        if (!same) {
                            reject({
                                status: 401,
                                message: "Password is incorrect"
                            });
                        } else {
                            // Login successful
                            const user = await User.findUser(email);
                            const signPayload = {
                                email,
                                isAdmin: user.isAdmin,
                                firstName: user.firstName,
                                lastName: user.lastName
                            };
                            const token = jwt.sign(signPayload, tokenSecret, {
                                expiresIn: '1h'
                            });
                            resolve(token);
                        }
                        })
                })
            } else {
                return Promise.reject({
                    status: 401,
                    message: "User does not exist"
                })
            }
        } catch (e) {
            return Promise.reject({
                status: 401,
                message: "User does not exist"
            })
        }
    };

    // --------------------- POST METHODS---------------------------------

    /**
     * Adds a new app user to the DB
     * @param {UserInfo} userInfo The info of the new user to add
     * @returns {Promise<UserInfo | null>} Promise resolving to the info of the new user if successful, otherwise null
     */
    User.addNewUser = async (userInfo) => {
        try {
            const existingUser = await User.emailExists(userInfo.email);
            if (!existingUser) {
                const newUser = User.build({
                    userId: uuidv4(),
                    email: userInfo.email,
                    password: "",
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    isAdmin: userInfo.isAdmin,
                });
                return new Promise((resolve, reject) => {
                    bcrypt.hash(userInfo.password, saltFactor,
                        (err, hashedPassword) => {
                            if (err) {
                                reject(err)
                            } else {
                                newUser.password = hashedPassword;
                                newUser.save();
                                resolve(newUser)
                            }
                        });
                });
            } else {
                return Promise.resolve(null)
            }
        } catch (e) {
            return Promise.resolve(null);
        }

    };

    // ------------------------- PUT METHODS -------------------------------------------------

    /**
     * Updates the user with the given ID
     * @param {string} userId the ID of the user to update
     * @param {Partial<UserInfo>} userInfo all the the user properties to update
     * @returns {Promise<boolean>} whether the operation was successful or not
     */
    User.updateUser  = async (userId, userInfo) => {
        const newUserInfo = {
            ...userInfo
        };
        if (newUserInfo.hasOwnProperty("password")) {
            return new Promise((resolve) => {
                bcrypt.hash(userInfo.password, saltFactor,
                    (err, hashedPassword) => {
                        if (err) {
                            resolve(false);
                        } else {
                            newUserInfo.password = hashedPassword;
                            User.update(newUserInfo, {
                                where: {
                                    userId
                                }
                            });
                            resolve(true);
                        }
                    });
            })
        } else {
            User.update({
                ...newUserInfo
            }, {
                where: {
                    userId
                }
            });
            return Promise.resolve(true);
        }


    };

    return User;
};

export default user;
