import { NextPage } from "next";
import { useState, ChangeEvent, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../../db/firebase-config";
import { Container, Stack, Button, Input, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { logout } from "../../common/functions";
const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState<User>();


  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  onAuthStateChanged(auth, (currentUser) =>{
    if(currentUser)
      setUser(currentUser)
  });
  useEffect(() => {
    console.log(user?.email);
    if(user){
      router.push('/');
    }
  },[user])

  const login = async () => {
    if (email.length > 3 && password.length > 7) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError(true);
          });
      } catch (error) {
        console.log(error);
        setLoginError(true);
      }
    }
  };
  return (
    <div style={{ height: "60vh" }}>
      <h1>Login</h1>
      <Button onClick={logout}>Logout</Button>
      <Center h="full">
        <Container>
          {loginError ? <div>Registration Error</div> : null}
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
            <Button colorScheme={"gray"} variant="solid" onClick={login}>
              Login
            </Button>
          </Stack>
        </Container>
      </Center>
    </div>
  );
};
export default Login;
