'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    'Person',
                    'petName',
                    {
                        type: Sequelize.DataTypes.STRING,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    'Person',
                    'favoriteColor',
                    {
                        type: Sequelize.DataTypes.STRING,
                    },
                    { transaction: t }
                ),
            ]);
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await Promise.all([
            queryInterface.removeColumn('Person', 'petName', {
                transaction: t,
            }),
            queryInterface.removeColumn('Person', 'favoriteColor', {
                transaction: t,
            }),
        ]);
    },
};
