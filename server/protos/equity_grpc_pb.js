// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_equity_pb = require('../protos/equity_pb.js');

function serialize_equity_Empty(arg) {
  if (!(arg instanceof protos_equity_pb.Empty)) {
    throw new Error('Expected argument of type equity.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_equity_Empty(buffer_arg) {
  return protos_equity_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_equity_Equity(arg) {
  if (!(arg instanceof protos_equity_pb.Equity)) {
    throw new Error('Expected argument of type equity.Equity');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_equity_Equity(buffer_arg) {
  return protos_equity_pb.Equity.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_equity_EquityId(arg) {
  if (!(arg instanceof protos_equity_pb.EquityId)) {
    throw new Error('Expected argument of type equity.EquityId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_equity_EquityId(buffer_arg) {
  return protos_equity_pb.EquityId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_equity_EquityList(arg) {
  if (!(arg instanceof protos_equity_pb.EquityList)) {
    throw new Error('Expected argument of type equity.EquityList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_equity_EquityList(buffer_arg) {
  return protos_equity_pb.EquityList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_equity_newEquity(arg) {
  if (!(arg instanceof protos_equity_pb.newEquity)) {
    throw new Error('Expected argument of type equity.newEquity');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_equity_newEquity(buffer_arg) {
  return protos_equity_pb.newEquity.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_equity_result(arg) {
  if (!(arg instanceof protos_equity_pb.result)) {
    throw new Error('Expected argument of type equity.result');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_equity_result(buffer_arg) {
  return protos_equity_pb.result.deserializeBinary(new Uint8Array(buffer_arg));
}


// service definition
//
var EquityServiceService = exports.EquityServiceService = {
  listEquities: {
    path: '/equity.EquityService/listEquities',
    requestStream: false,
    responseStream: false,
    requestType: protos_equity_pb.Empty,
    responseType: protos_equity_pb.EquityList,
    requestSerialize: serialize_equity_Empty,
    requestDeserialize: deserialize_equity_Empty,
    responseSerialize: serialize_equity_EquityList,
    responseDeserialize: deserialize_equity_EquityList,
  },
  readEquity: {
    path: '/equity.EquityService/readEquity',
    requestStream: false,
    responseStream: false,
    requestType: protos_equity_pb.EquityId,
    responseType: protos_equity_pb.Equity,
    requestSerialize: serialize_equity_EquityId,
    requestDeserialize: deserialize_equity_EquityId,
    responseSerialize: serialize_equity_Equity,
    responseDeserialize: deserialize_equity_Equity,
  },
  createEquity: {
    path: '/equity.EquityService/createEquity',
    requestStream: false,
    responseStream: false,
    requestType: protos_equity_pb.newEquity,
    responseType: protos_equity_pb.result,
    requestSerialize: serialize_equity_newEquity,
    requestDeserialize: deserialize_equity_newEquity,
    responseSerialize: serialize_equity_result,
    responseDeserialize: deserialize_equity_result,
  },
  updateEquity: {
    path: '/equity.EquityService/updateEquity',
    requestStream: false,
    responseStream: false,
    requestType: protos_equity_pb.Equity,
    responseType: protos_equity_pb.result,
    requestSerialize: serialize_equity_Equity,
    requestDeserialize: deserialize_equity_Equity,
    responseSerialize: serialize_equity_result,
    responseDeserialize: deserialize_equity_result,
  },
  deleteEquity: {
    path: '/equity.EquityService/deleteEquity',
    requestStream: false,
    responseStream: false,
    requestType: protos_equity_pb.EquityId,
    responseType: protos_equity_pb.result,
    requestSerialize: serialize_equity_EquityId,
    requestDeserialize: deserialize_equity_EquityId,
    responseSerialize: serialize_equity_result,
    responseDeserialize: deserialize_equity_result,
  },
};

exports.EquityServiceClient = grpc.makeGenericClientConstructor(EquityServiceService);
