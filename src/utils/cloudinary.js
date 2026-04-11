// cloudinary basically is used to upload files on server from our local system , it is a kind service just like aws service

import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary= async (localFilePath)=>{
        try{
             if(!localFilePath) return null;
             //upload file on cloudinary
         const respose =  await  cloudinary.uploader.upload(localFilePath, {
                resource_type:"auto",

             })

             // file has been uploaded successfully
             console.log("file is uploaded on cloudinary successfully",
             response.url);
             return response;

        }
        catch(error){
            fs.unlinkSync(localFilePath)
            // remove locally saved temporary files as the upload operation got failed
        }
    }

    export {uploadOnCloudinary}