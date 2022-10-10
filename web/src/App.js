import {
  Box,
  Grid,
  Flex,
  Button,
  Image,
  useDisclosure,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import CreateNoteInput from "./components/CreateNoteInput";
import Navbar from "./components/Navbar";
import PreviewNote from "./components/PreviewNote";
import "./index.css";
import login from "./assets/login.svg";
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
import noNotes from "./assets/no-notes.svg";

function App() {
  const { isUserLoggedIn } = useAuth();
  const [createNewNote, setCreateNewNote] = useState(false);
  const [idOfNoteOnView, setIdOfNoteOnView] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: notes, isLoading } = useQuery(
    [GET_USER_NOTES, searchInput],
    () => getUsetNotes(searchInput),
    {
      select: (response) => response?.data?.data,
      retry: 1,
      enabled: isUserLoggedIn,
    }
  );

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

  return (
    <Box className="App">
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />

      {isUserLoggedIn ? (
        <>
          <CreateNoteInput />

          {notes?.length < 1 ? (
            <Flex
              direction="column"
              justify="center"
              align="center"
              height={{ base: "80vh", md: "auto" }}
            >
              <Image
                boxSize={{ base: "14rem", md: "20rem" }}
                src={noNotes}
                alt="no notes"
              />
              <Text
                mt="3rem"
                color="teal.300"
                fontSize="1.4rem"
                fontWeight="500"
              >
                Wow such empty..
              </Text>
            </Flex>
          ) : isLoading ? (
            <Flex
              direction="column"
              gap="2rem"
              height="50vh"
              align="center"
              justify="center"
            >
              {[1, 2].map((e) => {
                return (
                  <Skeleton
                    key={e}
                    width="80%"
                    maxW="55rem"
                    height={{ base: "4rem", md: "6rem" }}
                  />
                );
              })}
            </Flex>
          ) : (
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
          )}

          {idOfNoteOnView && (
            <ViewNote
              noteId={idOfNoteOnView}
              onClose={onClose}
              isOpen={isOpen}
            />
          )}

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
          <Box>
            <Image
              boxSize={{ base: "15rem", md: "25rem" }}
              src={login}
              alt="login"
            />
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
