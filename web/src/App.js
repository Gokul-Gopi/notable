import {
  Box,
  Grid,
  Flex,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import CreateNoteFloatingButton from "./components/CreateNoteFloatingButton";
import CreateNoteInput from "./components/CreateNoteInput";
import Navbar from "./components/Navbar";
import PreviewNote from "./components/PreviewNote";
import "./index.css";
import mockData from "./utils/mock-data.json";
import loginScreen from "./assets/login-screen.svg";
import { AiOutlineLogin } from "react-icons/ai";
import CustomModal from "./components/CustomModal";
import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isUserLoggedIn } = useAuth();

  //for login form modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //for signup form modal
  const {
    isOpen: isSignupFormOpen,
    onOpen: onSignupFormOpen,
    onClose: onSignupFormClose,
  } = useDisclosure();

  return (
    <Box className="App">
      <Navbar />

      {isUserLoggedIn ? (
        <>
          <CreateNoteInput />
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap="4rem"
            justifyItems="center"
            width={{ base: "90%", lg: "70rem" }}
            m="auto"
            py={{ base: "2rem", lg: "3rem" }}
          >
            {mockData.map((e, i) => {
              return <PreviewNote key={i} noteDetails={e} />;
            })}
          </Grid>

          {/* <CreateNoteFloatingButton /> */}
        </>
      ) : (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Box mb="2rem">
            <Image boxSize="20rem" src={loginScreen} alt="login-screen" />
          </Box>
          <Button
            onClick={onOpen}
            bg="brand.primary"
            color="white"
            fontWeight="500"
            _hover={{ transform: "scale(1.1)" }}
            leftIcon={<AiOutlineLogin />}
          >
            Login
          </Button>

          <CustomModal title="Welcome back" isOpen={isOpen} onClose={onClose}>
            <LoginForm openSignupForm={onSignupFormOpen} onClose={onClose} />
          </CustomModal>
          <CustomModal
            title="Create an account"
            isOpen={isSignupFormOpen}
            onClose={onSignupFormClose}
          >
            <SignUpForm openLoginForm={onOpen} onClose={onSignupFormClose} />
          </CustomModal>
        </Flex>
      )}
    </Box>
  );
}

export default App;
