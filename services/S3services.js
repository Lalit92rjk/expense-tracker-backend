const AWS   =  require('aws-sdk') 
 const uploadtoS3= (data,filename)=>{
    const BUCKET_NAME= "expensetracker1";
    const IM_USER_KEY  =  "AKIA5OBNYVQWUPPS72PA";
    const IM_USER_SECRET = "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"

    let s3bucket  =  new AWS.S3({
        accessKeyId : IM_USER_KEY,
        secretAccessKey: IM_USER_SECRET,
        //Bucket:BUCKET_NAME
    })

  
        var params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('Something went wrong',err)
                    reject(err)
                }else{
                    //console.log('success',s3response)
                    resolve(s3response.Location)
                }
            })

        })
       
    


}

module.exports = {
    uploadtoS3
}