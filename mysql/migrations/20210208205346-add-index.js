module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn(
                'Person',
                'petNameIndex',
                {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false
                },
                { transaction }
            );
            await queryInterface.addIndex('Person', ['petNameIndex'], {
                fields: ['petNameIndex'],
                unique: true,
                transaction,
            });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('Person', 'petNameIndex', {
                transaction,
            });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
};
