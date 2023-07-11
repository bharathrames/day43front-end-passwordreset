import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css'
import { useFormik } from 'formik';

const Login = () => {
    const [message,setMessage] = useState()
    //   formik metod to get email and password from body
    const { handleSubmit, handleBlur, values, handleChange } = useFormik(
        {
            initialValues: {
                email:"",
                password: ""
            },
            onSubmit: (login) => {
                verify(login)
                values.email = ""
                values.password = ""
                
            }

        }
    )

    // login method
    const verify = async (login) => {
        try {


            const response = await fetch(`https://day43backend-passwordreset.vercel.app/user/login`, {
                method: "POST",
                body: JSON.stringify(login),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            // consoling data
           
            setMessage(data.message)

        } catch (error) {
            console.log("email verification error", error)
        }
    }
    return (
        <div className="formDiv">
            <Form className='form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required
                    
                    onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"/>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                    
                    onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                    />
                </Form.Group>

                <Button variant='primary' type="submit">
                    Login Now
                </Button>
                <a href='/' >Signup Now</a>
                <a href='/forgot' >Forgot Password</a>
            </Form>
            {message&&<div className="form">{message}</div>}
        </div>
    )
}

export default Login