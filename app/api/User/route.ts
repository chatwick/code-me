// import db from '../../utils/mysqldb'
import { NextResponse,NextRequest } from 'next/server'

export async function POST(request:Request) {

  try{

    const {email,password} = await request.json();
    console.log(email);
    console.log(password);
    console.log("Should run");
    return NextResponse.json({message:'Okeee'})

  }catch(err){

    return NextResponse.json({error:'Error !!!!!!!!!'})

  }
}