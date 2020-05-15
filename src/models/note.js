// TODO notes should have tags, date, title, body
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', {
        noteID: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            unique: false,
            allowNull: true
        }
    });

    Note.filter = async params => {
        let parsedParams = Note.parseQuery(params);
        return Note.findAll({
            where: parsedParams
        });
    };

    const {Op} = require('sequelize');

    Note.parseQuery = async (queryObj) => {
        let where = {};
        let queryParams = ['noteID', 'date', 'title', 'body', 'tags'];

        for (const param of queryParams) {
            if (param in queryObj) {
                let query = queryObj[param];

                if (param === 'title' || param === 'body') {
                    where[param] = {[Op.substring]: query};
                }
                else {
                    where[param] = query;
                }
            }
        }
        console.log("Query params for where are:  ", where);
        return where;
    };

    Note.addNewNote = async (note) => Note.create({
        ...note
    });

    Note.updateNote = async (noteID, noteBody) => Note.update({
        ...noteBody
    }, {
        where: {
            noteID: noteID
        }
    });
    return Note;
};