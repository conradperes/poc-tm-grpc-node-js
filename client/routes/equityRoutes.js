// requirements
const express = require('express');
const grpcRoutes = require('./grpcRoutes');

// new router
const router = express.Router();

// routes
router.get('/equities', grpcRoutes.listEquities);
router.get('/equities/:id', grpcRoutes.readEquity);
router.post('/equities', grpcRoutes.createEquity);
router.put('/equities/:id', grpcRoutes.updateEquity);
router.delete('/equities/:id', grpcRoutes.deleteEquity);

module.exports = router;