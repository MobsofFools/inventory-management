import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../db/firebase-config";
import { Container, Stack, Button, Input, Center } from "@chakra-ui/react";

const Register: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState(false);
  const router = useRouter();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const register = async () => {
    if (email.length > 3 && password.length > 7) {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setRegistrationError(true);
          });
      } catch (error) {
        console.log(error);
        setRegistrationError(true);
      }
    }
  };

  return (
    <div style={{ height: "100vh" }}>
        <h1>Register</h1>
      <Center h="full">
        <Container>
          {registrationError ? <div>Registration Error</div> : null}
          <Stack spacing={4} direction={"column"} align={"center"}>
            <Input
              variant="filled"
              placeholder="Email"
              value={email}
              onChange={onEmailChange}
            ></Input>
            <Input
              variant="filled"
              placeholder="Password"
              type={"password"}
              value={password}
              onChange={onPasswordChange}
            ></Input>
            <Button colorScheme={"gray"} variant="solid" onClick={register}>
              Register
            </Button>
          </Stack>
        </Container>
      </Center>
    </div>
  );
};
export default Register;
