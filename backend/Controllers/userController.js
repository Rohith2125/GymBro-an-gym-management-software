const User = require('../models/user')
const Membership = require('../models/membership')
const Plan = require('../models/plan')

exports.userProfile= async (req, res) => {

    try {

        const userId = req.user.id
        console.log(userId)
        const user = await User.findById(userId)
        console.log("user det:", user)

        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
  const all = await Membership.find();
console.log("All memberships:", all);

        const MembershipPlan = await Membership.findOne({ userID: userId }).populate('planId', 'title duration')
        console.log(MembershipPlan)
let planData= null

        if(MembershipPlan){
            planData = {
                planName: MembershipPlan.planId.title,
                duration: MembershipPlan.planId.duration,
                expireOn: MembershipPlan.expiresOn
            };
        }

        const profileData = {
            user: {
                name: user.name,
                email: user.email,
                plan: planData
               
            }
        }
        console.log(profileData)
      


        res.status(200).json({ message: 'got user profile successfully', profileData  })

    } catch (error) {
        res.status(400).json({ message: "error in fetching user profile", error: error.message })
        console.log("User Profile Error:", error);

    }

}


exports.createMembership= async (req,res)=>{

    try{
        const {userId, planId} = req.user.id
        const fromDate= new Date
        const expiresOn= new Date(fromDate);
        expiresOn.setMonth(expiresOn.getMonth() + plan.duration)
        const plan= await Plan.findById(planId)
        if(!plan){return res.status(400).json({message: 'plan does not exit'})}
        
        const createMembership = await Membership.create({
            userID: userId,
            planId: planId,
            Date: Date.now,
            expiresOn: expiresOn
        })   
       return res.status(200).json({message: 'created membership successfully', membership: createMembership})
    }catch(error){
        console.log('failed in creating membership: ',error.message)
     return res.status(400).json({message: 'failed to create membership', error: error.message})   
    }

}

