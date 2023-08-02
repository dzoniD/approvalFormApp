import { FormValues } from "@/components/Login/SignIn";

export const checkEmail = (serverUsers:FormValues[],formData:FormValues): FormValues | null  => {
    const user = serverUsers.find(user => user.email === formData.email); 
     if (user) return user;

     return null;
   };