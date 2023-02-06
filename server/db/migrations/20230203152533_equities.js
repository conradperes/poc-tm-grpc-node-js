exports.up = function (knex, Promise) {
    return knex.schema.createTable('equities', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.string('quotation').notNullable();
      table.string('dateOfPurchase').notNullable();
    });
};
  
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('equities');
};