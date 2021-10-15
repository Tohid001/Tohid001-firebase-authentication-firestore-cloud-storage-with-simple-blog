import React, { useState } from "react";
import { Row, Col } from "antd";

// import { useAuth } from "../../contexts/authContext";
// import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import ProfilePic from "./Avatar";
import SignUpForm from "./form";

export default function Signup() {
  const [fileDetails, setFileDetails] = useState({});
  const filePath = `/files/profiles/pic`;
  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const passwordConfirmRef = useRef()
  // const { signup } = useAuth()
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)
  // const history = useHistory()

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setError("Passwords do not match")
  //   }

  //   try {
  //     setError("")
  //     setLoading(true)
  //     await signup(emailRef.current.value, passwordRef.current.value)
  //     history.push("/")
  //   } catch {
  //     setError("Failed to create an account")
  //   }

  //   setLoading(false)
  // }

  return (
    <CenteredContainer>
      <Row gutter={[0, { xs: 20, sm: 20, md: 20, lg: 0 }]}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 3 }}
        >
          <Row justify="center">
            <ProfilePic setFileDetails={setFileDetails} filePath={filePath} />
          </Row>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 22 }}
        >
          <Row justify="center">
            <SignUpForm fileDetails={fileDetails} filePath={filePath} />
          </Row>
        </Col>
      </Row>
    </CenteredContainer>
  );
}
