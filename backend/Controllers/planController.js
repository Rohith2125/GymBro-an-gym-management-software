
const plan = require('../models/plan')

exports.CreatePlan= async (req,res)=>{

    try{

        const {title, duration, amount}= req.body
        const createPlan= await plan.create({
            title: title,
            duration: duration,
            amount: amount,
        })
        
        
        res.status(200).json({message: 'plan created successfully', createPlan})
    }catch(error){
        console.log(error.message)
        res.status(400).json({message: 'plan created failed', error: error.message})

    }
}