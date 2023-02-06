exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('equities').del()
    .then(function () {
      // Inserts seed entries
      return knex('equities').insert([
        { name: 'ETH', quotation: '1.99' , dateofpurchase : '2023-02-03 16:31:30.945' },
        { name: 'Coca-Cola', quotation: '2.99' , dateofpurchase : '2023-02-03 16:31:30.945'},
      ]);
    });
};