import User from "@/models/usermodel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function POST(request:NextRequest){
  try {
    const reqbody = await request.json();
    const email = reqbody.email;
    const password = reqbody.password;

    if (!email.endsWith("@cea.gov.in")) {
      console.log("please provide CEA approved mails");
      return NextResponse.json({
        succeess: false,
        message: "Only CEA issued mails are allowed "
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Please register first");
      return NextResponse.json({
        success: false,
        Message: "User does not exist",
      });
    }

    //check password and of stored in data base and user provide password
    
    

    const isValid = await bcrypt.compare(password, user.password);
    
    console.log(isValid);
    

    if(!isValid){
        console.log("line 43");
        
        return NextResponse.json({error:"invalid password" , status:400,success:false})
    }
    
    const tokenData={email:user.email};

    console.log(tokenData);
    

        const token= await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn : "1d"});

        const response=NextResponse.json({
            message: "Login successful",
            success:true,
            status:301
        })

        // console.log(response);
        

        response.cookies.set("token" , token ,{
            httpOnly: true,
            // path: "/"
        })
        return response;


  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}