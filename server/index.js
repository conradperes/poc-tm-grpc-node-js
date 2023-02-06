// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// knex
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

// grpc service definition
const equityProtoPath = path.join(__dirname, '..', 'protos', 'equity.proto');
const equityProtoDefinition = protoLoader.loadSync(equityProtoPath);
const equityPackageDefinition = grpc.loadPackageDefinition(equityProtoDefinition).equity;
/*
Using an older version of gRPC?
(1) You won't need the @grpc/proto-loader package
(2) const productPackageDefinition = grpc.load(productProtoPath).product;
*/

// knex queries
function updateEquity(call, callback) {
    knex('equities')
      .where({ id: parseInt(call.request.id) })
      .update({
        name: call.request.name,
        quotation: call.request.quotation,
      })
      .returning()
      .then((data) => {
        if (data) {
          callback(null, { status: 'success' });
        } else {
          callback('That equity does not exist');
        }
      });
  }
function deleteEquity(call, callback) {
    knex('equities')
      .where({ id: parseInt(call.request.id) })
      .delete()
      .returning()
      .then((data) => {
        if (data) {
          callback(null, { status: 'success' });
        } else {
          callback('That equities does not exist');
        }
      });
  }
// knex queries
function listEquities(call, callback) {
    /*
    Using 'grpc.load'? Send back an array: 'callback(null, { data });'
    */
    knex.select('id','name','quotation','dateofpurchase')
        .from('equities')
    
        .then((data) => { 
            //console.log(data);
            callback(null, { equities: data }); 
        });
}

function readEquity(call, callback) {
    knex('equities')
      .where({ id: parseInt(call.request.id) })
      .then((data) => {
        if (data.length) {
          callback(null, data[0]);
        } else {
          callback('That equity does not exist');
        }
      });
}
function createEquity(call, callback) {
    knex('equities')
      .insert({
        name: call.request.name,
        quotation: call.request.quotation,
      })
      .then(() => { callback(null, { status: 'success' }); });
  };
// main
function main() {
  const server = new grpc.Server();
  // gRPC service
  server.addService(equityPackageDefinition.EquityService.service, {
    listEquities: listEquities,
    readEquity: readEquity,
    createEquity: createEquity,
    updateEquity: updateEquity,
    deleteEquity: deleteEquity,
  });
  // gRPC server
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server running at http://127.0.0.1:50051');
}

main();