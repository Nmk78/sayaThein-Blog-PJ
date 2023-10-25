import { connecToMongoDB } from "@lib/mongodb";
import User from "@models/user";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";
export async function POST (req){

      try {
            const {name, email, password, referralCode} = await req.json();
            if(password.length < 8){
                  return NextResponse.json({message : "Password must be at least 8 characters long"}, {status : 400})
            }
            console.log("Name:", name, "Email:", email, "Password:", password, "Referral-Code:", referralCode);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await connecToMongoDB()
            await User.create({name, email, password: hashedPassword, referralCode});

            return NextResponse.json({message : "User registered successful"}, {status : 201});
      } catch (error) {
            console.log('\x1b[31m%s\x1b[0m',"Register Failed",error);

            return NextResponse.json({message : "User register failed"}, {status : 500});

      }
}