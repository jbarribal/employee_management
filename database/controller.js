import Users from '../model/user'



export async function getUser(req,res){
    try{
        const { userId } = req.query
        const user = await Users.findById(userId)
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({err:"Cannot Get User"})
    }
}
export async function getUsers(req, res){
    try {
        const users = await Users.find({})

        if(!users){
            return res.status(404).json({error: 'No Users Found'})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({error: 'No Users Found'})
    }
}

export async function postUser(req, res){
    try {
        const formData = req.body
        if(!formData) return res.status(404).json({error: 'Form Data Not Found!'})
        Users.create(formData, (err, data) => {
            return res.status(200).json(data)
        })
    } catch (error) {
        res.status(404).json({error: 'User not created'})
    }
}
export async function putUser(req,res){
    try {
        const { userId } = req.query
        const formData = req.body

        if(userId && formData){
            await Users.findByIdAndUpdate(userId, formData)
            res.status(200).json(formData)
        }

        res.status(404).json({error: 'User not Selected'})
    } catch (error) {
        res.status(404).json({error: 'User not updated'})
    }
}

export async function deleteUser(req,res){
    try {
        const { userId } = req.query
        
        if(userId){
            await Users.findByIdAndDelete(userId)
            res.status(200).json({message: 'User Deleted'})
        }
        res.status(404).json({error: 'User not Selected'})
    } catch (error) {
        res.status(404).json({error: 'User not deleted'})
    }
}