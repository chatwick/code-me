"use client"

import Image from 'next/image'
import React from 'react'
import loginVector from '../../public/undraw_secure_login_pdn4.svg'
import loginVector2 from './undraw_secure_login_pdn5.svg'
import { useForm } from 'react-hook-form'
import { log } from 'console'
import Link from 'next/link'
import patternbg from '../public/loginbg.jpg'


type Inputs = {
    example: string,
    exampleRequired: string,
};

// Strings


export default function SignIn()
{

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    });

    const handleFormSubmit = async (data: object) =>
    {
        console.log(data);

    }


    return (
        <div className="flex bg-customBG2 justify-center">
            <div className="card card-bordered lg:card-side lg:w-3/5 bg-base-100 shadow-xl my-20">
                <div className=" lg:flex hidden mx-10">
                    <Image
                        alt='defaultImage'
                        src={loginVector}
                        width={400}>
                    </Image>
                </div>

                <div className="divider divider-horizontal"></div>

                <div className="card-body my-10">
                    <div className="prose lg:prose-lg justify-center flex flex-col items-center prose-headings:text-center ">
                        <h1 className=''>Login</h1>
                        <p className=''>Enter an your account details to login</p>

                    </div>
                    <form className='my-5' onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-control">

                            <div className="flex flex-col w-full my-4">
                                <label className="label">
                                    <span className="label-text">Enter your email</span>
                                </label>
                                <input className='input input-bordered' {...register("email", { required: "Please enter an email" })}/>
                                <p className='pl-3 text-warning'>{errors.email?.message}</p>
                            </div>


                            <div className="flex flex-col w-full my-4">
                                <label className="label">
                                    <span className="label-text">Enter your password</span>
                                </label>
                                <input className='input input-bordered' type="password" {...register("password", {
                                    required: "Please enter a password", minLength: {
                                        value: 8,
                                        message: "Password should be 8 characters long minimum"
                                    }
                                })}/>
                                <p className='pl-3 text-warning'>{errors.password?.message}</p>
                            </div>

                        </div>
                        <div className="flex flex-col card-actions items-center justify-center my-10">
                            <button className="btn btn-primary w-40">Login</button>
                            <p>Don't have an account? <Link className='underline hover:text-blue-500' href='./login'>Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
