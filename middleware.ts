import { NextRequest, NextResponse } from "next/server";



export default function middleware(req: NextRequest){

    const loginUrl = new URL('/login',req.url).toString();
    const homeUrl = new URL('/',req.url).toString();

    let loggedIn = req.cookies.get('isLoggedIn');
    console.log('Loged in',loggedIn)
    
    // console.log(req.nextUrl.pathname,'==============',loginUrl,'------',!loggedIn);
    
        
        if(!loggedIn?.value && req.url.includes('/form-details-page')){
            console.log('form details if')
            return NextResponse.redirect(loginUrl)
        }

        if(!loggedIn?.value && req.nextUrl.pathname =='/'){   
            console.log('/ if')
            return NextResponse.redirect(loginUrl)
        }

        if(loggedIn?.value && (req.url.includes('/login') || req.url.includes('/signin'))){
            return NextResponse.redirect(homeUrl)
        }

}