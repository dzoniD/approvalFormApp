import { NextRequest, NextResponse } from "next/server";



export default function middleware(req: NextRequest){
    const absoluteUrl = new URL('/login',req.url).toString();

    // console.log(req.url,'==============',absoluteUrl);

    if(req.url === absoluteUrl){
        return NextResponse.redirect(new URL('/',req.url).toString())
    }
}