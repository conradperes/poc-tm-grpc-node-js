// requirements
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

// gRPC client
const equityProtoPath = path.join(__dirname, '..', '..', 'protos', 'equity.proto');
const equityProtoDefinition = protoLoader.loadSync(equityProtoPath);
const equityPackageDefinition = grpc.loadPackageDefinition(equityProtoDefinition).equity;
const client = new equityPackageDefinition.EquityService(
  'localhost:50051', grpc.credentials.createInsecure());
/*
Using an older version of gRPC?
(1) You won't need the @grpc/proto-loader package
(2) const productPackageDefinition = grpc.load(productProtoPath).product;
(3) const client = new productPackageDefinition.ProductService(
  'localhost:50051', grpc.credentials.createInsecure());
*/

// handlers

const readEquity = (req, res) => {
    const payload = { id: parseInt(req.params.id) };
    /*
    gRPC method for reference:
    readProduct(ProductId) returns (Product)
    */
    client.readEquity(payload, (err, result) => {
        if (err) {
        res.json('That equity does not exist.');
        } else {
        res.json(result);
        }
    });
};
const createEquity = (req, res) => {
    const payload = { name: req.body.name, quotation: req.body.quotation };
    /*
    gRPC method for reference:
    createProduct(newProduct) returns (result)
    */
    client.createEquity(payload, (err, result) => {
      res.json(result);
    });
};
const updateEquity = (req, res) => {
    const payload = { id: parseInt(req.params.id), name: req.body.name, quotation: req.body.quotation };
    /*
    gRPC method for reference:
    updateProduct(Product) returns (result)
    */
    client.updateEquity(payload, (err, result) => {
      if (err) {
        res.json('That equity does not exist.');
      } else {
        res.json(result);
      }
    });
  };
const deleteEquity = (req, res) => {
    const payload = { id: parseInt(req.params.id) };
    /*
    gRPC method for reference:
    deleteProduct(ProductId) returns (result)
    */
    client.deleteEquity(payload, (err, result) => {
    if (err) {
        res.json('That equity does not exist.');
    } else {
        res.json(result);
    }
    });
};

const listEquities = (req, res) => {
    /*
    gRPC method for reference:
    listProducts(Empty) returns (ProductList)
    */
    client.listEquities({}, (err, result) => {
        console.log(result);
        res.json(result);
    });
};
  
module.exports = {
  listEquities,
  readEquity,
  createEquity,
  updateEquity,
  deleteEquity,
};