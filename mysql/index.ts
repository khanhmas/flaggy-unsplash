import { Sequelize, INTEGER, STRING } from 'sequelize';
require('dotenv').config();
(async () => {
    const sequelize = new Sequelize(
        process.env.DB_NAME!,
        process.env.DB_USERNAME!,
        process.env.DB_PASSWORD!,
        {
            host: process.env.DB_HOST!,
            dialect: 'mysql',
        }
    );

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        sequelize.define('product', {
            id: {
                type: INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,

            },
            title: STRING
        });
        await sequelize.sync();
        sequelize.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
