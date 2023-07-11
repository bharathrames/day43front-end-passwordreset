import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './style.css'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Forgot = () => {
    const [verifyEmail, setVerifyEmail] = useState(true)
    const [emailverified, setEmailverified] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)
    const [idx,setIdx] = useState()
    const [userId,setUserId] = useState()
   
    return (
        <div className="formDiv">

            {/* Email checking component */}
            {verifyEmail && <Emailverification
     
                setVerifyEmail={setVerifyEmail}
             
                setEmailverified={setEmailverified}
    
                setOtpVerified={setOtpVerified}
  
                setIdx={setIdx}
                setUserId={setUserId}
            />}

            {/* otp component */}
            {emailverified && <OtpVerification

                setVerifyEmail={setVerifyEmail}

                setEmailverified={setEmailverified}

                setOtpVerified={setOtpVerified}
                idx={idx}

            />}

            {/* password changing component */}
            {otpVerified && <ResetPaasword

                setVerifyEmail={setVerifyEmail}

                setEmailverified={setEmailverified}
    
                setOtpVerified={setOtpVerified}
            
                userId={userId}
            />}
        </div>
    )
}

// email checking compnent
const Emailverification = ({ setUserId,setIdx,setVerifyEmail, setEmailverified, setOtpVerified }) => {

// formik method to check email
    const { handleSubmit, handleBlur, values, handleChange } = useFormik(
        {
            initialValues: {
                email: ""
            },
            onSubmit: (email) => {
                verify(email)
                values.email = ""
            }

        }
    )
    // fetch method
    const verify = async (email) => {
        try {


            const response = await fetch("https://day43backend-passwordreset.vercel.app/forgot", {
                method: "POST",
                body: JSON.stringify(email),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            // changing component method
            setVerifyEmail(false)
            setEmailverified(true)
            setOtpVerified(false)

            // set id for otp verification
            setIdx(data.otp._id)
            setUserId(data.otp.userId)
            console.log(data)


        } catch (error) {
            console.log("email verification error", error)
        }
    }


    return (
        <Form className='form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                />

            </Form.Group>
            <Button variant='primary' type="submit">
                Verify Your Email
            </Button>
            <a href='/login' >Login Now</a>
            <a href='/' >Signup Now</a>
        </Form>
    )
}

const OtpVerification = ({ idx,setIdx,setVerifyEmail, setEmailverified, setOtpVerified }) => {
   
//    formik method to check otp
   
    const { handleSubmit, handleBlur, values, handleChange } = useFormik(
        {
            initialValues: {
                token: ""
            },
            onSubmit: (otp) => {
                verify(otp)
                values.otp = ""
            }

        }
    )

    // verifying otp 
    const verify = async (otp) => {
        try {


            const response = await fetch(`https://day43backend-passwordreset.vercel.app/verifyotp/${idx}`, {
                method: "POST",
                body: JSON.stringify(otp),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            // component changing method
            setVerifyEmail(false)
            setEmailverified(false)
            setOtpVerified(true)
            // consoling data
            console.log(data)

            
        } catch (error) {
            console.log("email verification error", error)
        }
    }

    return (
        <Form className='form' onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>OTP</Form.Label>
                <Form.Control type="text" placeholder="Enter Password" required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.token}
                name="token"
                 />
            </Form.Group>

            <Button variant='primary' type="submit"

            >
                Enter OTP
            </Button>
        </Form>
    )
}

const ResetPaasword = ({ userId,setVerifyEmail, setEmailverified, setOtpVerified }) => {
    const history = useHistory()
//   formik metid to change the password
    const { handleSubmit, handleBlur, values, handleChange } = useFormik(
        {
            initialValues: {
                password: ""
            },
            onSubmit: (password) => {
                verify(password)
                values.password = ""
            }

        }
    )

    // changing password to backend
    const verify = async (password) => {
        try {


            const response = await fetch(`https://day43backend-passwordreset.vercel.app/forgot/reset/${userId}`, {
                method: "PUT",
                body: JSON.stringify(password),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            // component changing method
            setVerifyEmail(true)
            setEmailverified(false)
            setOtpVerified(false)
            // consoling data
            console.log(data)
            history.push("/login")


        } catch (error) {
            console.log("email verification error", error)
        }
    }

    return (
        <Form className='form' onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter New Password" required 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"/>
            </Form.Group>

            <Button variant='primary' type="submit"
                

            >
                Change Your Paaword
            </Button>
        </Form>
    )
}
export default Forgot