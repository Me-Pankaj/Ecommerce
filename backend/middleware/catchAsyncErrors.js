// This is for Handling async functions inspite of writting try catch block 1:13

module.exports = theFunc=>(req,res,next)=>{

    Promise.resolve(theFunc(req,res,next)).catch(next)
}
