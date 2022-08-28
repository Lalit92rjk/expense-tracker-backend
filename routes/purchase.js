const express  =  require('express');

const purchasecontroller  = require('../controller/purchase');

const authenticatemiddleware  =  require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership',authenticatemiddleware.authenticate,purchasecontroller.purchasepremium);

router.post('/updatetransactions',authenticatemiddleware.authenticate,purchasecontroller.updateTransactionStatus);

module.exports =  router;