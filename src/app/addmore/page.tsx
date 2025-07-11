"use client"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function addmore(){

    const router=useRouter();

    const addguest=()=>{
        router.push("/guestupdate");
    }

    const logout=async()=>{
        try {
            const res=await axios.get("/api/users/logout")

            if(res.data.success){
                console.log("logout successful");
                router.push("/login");
                
            }

        } catch (error:any) {
            console.log(error.message,"logout not successfull");
            
        }
    }

    return (
      <div className="min-h-screen flex flex-col items-center pt-4 ">
        <h1 className="text-3xl" >Guest Information added successfully</h1>
        <br />
        <br />
        <Button onClick={addguest} variant="outline">Add More Guest</Button>
        <br />
        <br />
        <br />
        <Button onClick={logout} variant="outline" >Logout</Button>
      </div>
    );

}