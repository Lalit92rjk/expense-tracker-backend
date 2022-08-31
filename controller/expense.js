//const { JSON } = require('sequelize');
const Expense = require('../models/expenses');
const UserServices =  require('../services/userservices')
const S3service =  require('../services/S3services')

const downloadexpense = async (req,res)=>{
    try{
        const expenses = await UserServices.getExpenses(req);
        console.log(expenses);
        const stringifiedExpenses =  JSON.stringify(expenses)
    
        //depend on userid
        const userId  = req.user.id;
    
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileUrl =  await S3service.uploadtoS3(stringifiedExpenses,filename);
        console.log(fileUrl);
        res.status(200).json({fileUrl, success:true})

    }catch(err){
        console.log(err)
        res.status(500).json({fileUrl:'',success:false,err:err})
    }
   
}

const addexpense = (req, res) => {
    const { expenseamount, description, category } = req.body;
    req.user.createExpense({ expenseamount, description, category }).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(403).json({success : false, error: err})
    })
}

const getexpenses = (req, res)=> {

    req.user.getExpenses().then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        return res.status(402).json({ error: err, success: false})
    })
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    downloadexpense
}