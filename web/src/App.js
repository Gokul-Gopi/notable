import {
  Box,
  Grid,
  Flex,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import CreateNoteInput from "./components/CreateNoteInput";
import Navbar from "./components/Navbar";
import PreviewNote from "./components/PreviewNote";
import "./index.css";
import loginScreen from "./assets/login-screen.svg";
import { AiOutlineLogin } from "react-icons/ai";
import CustomModal from "./components/CustomModal";
import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";
import { useAuth } from "./context/AuthContext";
import { useQuery } from "react-query";
import { getUsetNotes } from "./services/note";
import { GET_USER_NOTES } from "./utils/react-query-keys";
import { ViewNote } from "./components/ViewNote";
import { useState } from "react";
import CreateNoteFloatingButton from "./components/CreateNoteFloatingButton";

function App() {
  const { isUserLoggedIn } = useAuth();
  const [idOfNoteOnView, setIdOfNoteOnView] = useState("");

  const { data: notes, isLoading } = useQuery(GET_USER_NOTES, getUsetNotes, {
    select: (response) => response?.data?.data,
  });

  const {
    isOpen: isLoginFormOpen,
    onOpen: openLoginFrom,
    onClose: closeLoginForm,
  } = useDisclosure();

  const {
    isOpen: isSignupFormOpen,
    onOpen: openSignupForm,
    onClose: closeSignupForm,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    <Box>Loading...</Box>;
  }

  return (
    <Box className="App">
      <Navbar />

      {isUserLoggedIn ? (
        <>
          <CreateNoteInput />
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ base: "0.6rem", md: "1.8rem", lg: "3rem" }}
            justifyItems="center"
            maxWidth={{ base: "95%", lg: "70rem" }}
            m="auto"
            py={{ base: "3rem", md: "1rem", lg: "3rem" }}
          >
            {notes?.map((e, i) => {
              return (
                <PreviewNote
                  key={i}
                  noteDetails={e}
                  openNote={onOpen}
                  setIdOfNoteOnView={setIdOfNoteOnView}
                />
              );
            })}
          </Grid>

          <ViewNote noteId={idOfNoteOnView} onClose={onClose} isOpen={isOpen} />

          <CreateNoteFloatingButton />
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
            onClick={openLoginFrom}
            bg="brand.primary"
            color="white"
            fontWeight="500"
            _hover={{ transform: "scale(1.1)" }}
            leftIcon={<AiOutlineLogin />}
          >
            Login
          </Button>

          <CustomModal
            title="Welcome back"
            isOpen={isLoginFormOpen}
            onClose={closeLoginForm}
          >
            <LoginForm
              openSignupForm={openSignupForm}
              onClose={closeLoginForm}
            />
          </CustomModal>

          <CustomModal
            title="Create an account"
            isOpen={isSignupFormOpen}
            onClose={closeSignupForm}
          >
            <SignUpForm
              openLoginForm={openLoginFrom}
              onClose={closeSignupForm}
            />
          </CustomModal>
        </Flex>
      )}
    </Box>
  );
}

export default App;
