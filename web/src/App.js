import {
  Box,
  Grid,
  Flex,
  Button,
  Image,
  useDisclosure,
  Skeleton,
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
import EditNote from "./components/EditNote";

function App() {
  const { isUserLoggedIn } = useAuth();
  const [createNewNote, setCreateNewNote] = useState(false); //only used for mobile
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
    return (
      <Flex
        direction="column"
        gap="2rem"
        height="90vh"
        border="10px"
        align="center"
        justify="center"
      >
        {[1, 2].map((e) => {
          return <Skeleton height="6rem" maxW={{ base: "80%", md: "60rem" }} />;
        })}
      </Flex>
    );
  }

  return (
    <Box className="App">
      <Navbar />

      {isUserLoggedIn ? (
        <>
          <CreateNoteInput />
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={{ base: "0.6rem", md: "1.8rem", lg: "2.5rem" }}
            justifyItems="center"
            maxWidth={{ base: "95%", md: "60rem", lg: "72rem" }}
            m="auto"
            px={{ base: "0", md: "2rem" }}
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

          <CreateNoteFloatingButton setCreateNewNote={setCreateNewNote} />
          {createNewNote && (
            <Flex
              onClick={() => setCreateNewNote(false)}
              top="0"
              right="0"
              bottom="0"
              left="0"
              bg="rgba(0,0,0,0.4)"
              pos="fixed"
              align="center"
              justify="center"
              px="0.6rem"
            >
              <EditNote openBlankNote={setCreateNewNote} />
            </Flex>
          )}
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
