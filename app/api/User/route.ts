// uses NextJs own Response
import { NextResponse,NextRequest } from 'next/server'

// this is get request
// http://localhost:3000/api/User (For get request)
export async function GET(request:Request) {
  try{

    console.log("GET request ran");
    return NextResponse.json({message:'Successful GET Request'})

  }catch(err){

    return NextResponse.json({error:'Error !!!!!!!!!'})

  }
  
}

// this is post request (To open press CTRL + hover on the link)
// http://localhost:3000/api/User
export async function POST(request:Request) {

  try{

    // paste the following on the API for JSON object section
    // {"name":"Hello world","age":22}

    //Following commented lines will get the data 
    // from frontend and then log them on server console
    const requestObject = await request.json()

    // log hole object
    console.log(requestObject);
    // log part of a object
    console.log(requestObject.name);

    console.log("POST request ran");
    return NextResponse.json({message:'Successful POST Request'})

  }catch(err){

    return NextResponse.json({error:'Error !!!!!!!!!'})

  }
}