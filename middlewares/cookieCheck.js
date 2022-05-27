module.exports = (req,res,next) =>{
    if(req.cookies.userCraftsy14){
        req.session.userLogin = req.cookies.userCraftsy14
    }
    console.log('>>>>>>>>>>>>>>>>>>>',req.session.userLogin)
    next()
}