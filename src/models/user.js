import uuidv4 from 'uuid/v4';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        userId: {
            type: DataTypes.UUID,
            unique: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
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

    // --------------------- GET METHODS ---------------------------------

    /**
     * Checks if the a user already exists with the given username
     * @param {string} username
     * @returns {Promise<boolean>}
     */
    User.usernameExists = async (username) =>
        User.findOne({where: {username}})
            .then(result => result !== null);

    // --------------------- POST METHODS---------------------------------

    /**
     * Adds a new app user to the DB
     * @param {
     *     Array<{
     *       username: string,
     *       firstName: string,
     *       lastName: string,
     *       isAdmin: boolean
     *     }>
     * } userInfo
     * @returns {Promise<void>}
     */
    User.addNewUser = async (userInfo) => {
        User.create({
            userId: uuidv4(),
            ...userInfo
        })
    };

    return User;
};

export default user;
