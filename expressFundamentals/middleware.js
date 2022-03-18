const accessControl = (req,res,next) => {
    const access = true;
    if(!access){
        res.status(401).json({
            success:false,
            message:'you are not authorized'
        })
    }
    console.log('middleware access control');
    next()
}

const defaultMiddleware = (req,res,next) => {
    console.log('default middleware');
    next()
}

module.exports = {
    accessControl,
    defaultMiddleware
}