import { NextRequest, NextResponse } from "next/server";



export default function middleware(req: NextRequest){

    const loginUrl = new URL('/login',req.url).toString();
    const homeUrl = new URL('/',req.url).toString();

    let loggedIn = req.cookies.get('isLoggedIn');

    

        
        if(!loggedIn?.value && req.url.includes('/form-details-page')){

            return NextResponse.redirect(loginUrl)
        }

        if(!loggedIn?.value && req.nextUrl.pathname =='/'){   

            return NextResponse.redirect(loginUrl)
        }

        if(loggedIn?.value && (req.url.includes('/login') || req.url.includes('/signin'))){
            return NextResponse.redirect(homeUrl)
        }

}