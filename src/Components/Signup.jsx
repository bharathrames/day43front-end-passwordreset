import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css'
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';



const Signup = () => {
    const [message,setMessage] = useState()
    const history = useHistory()
    //   formik metod to get email and password from body
    const { handleSubmit, handleBlur, values, handleChange } = useFormik(
        {
            initialValues: {
                name:"",
                email:"",
                password: ""
            },
            onSubmit: (signup) => {
                verify(signup)
                values.name = ""
                values.email = ""
                values.password = ""
                
            }

        }
    )

    // signup method
    const verify = async (signup) => {
        try {


            const response = await fetch(`https://day43backend-passwordreset.vercel.app/user/signup`, {
                method: "POST",
                body: JSON.stringify(signup),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            // consoling data
           console.log(data)
            setMessage(data.message)
            history.push("/login")
        } catch (error) {
            console.log("email verification error", error)
        }
    }
  return (
    <div className="formDiv" >
        <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Name </Form.Label>
        <Form.Control type="text" placeholder="Enter Name" required
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
        />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        name="email"
        />
       
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
        Signup Now
      </Button>
      <a href='/login' >Login Now</a>
      <a href='/forgot' >Forgot Password</a>
    </Form>
    {message&&<div className="form">{message}</div>}
    </div>
  )
}

export default Signup