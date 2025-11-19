const User= require('../models/user')

exports.totalUsers= async (req,res)=>{
    
  try{
      const users= await User.find()
      console.log(users)
      res.status(200).json({message:'total users', users: users})
    }catch(error){
        res.status(400).json({message:'error in findng total users', error:error})
    }
}