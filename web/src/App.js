import { Box, Grid, Flex, useDisclosure } from "@chakra-ui/react";
import CreateNoteInput from "./components/CreateNoteInput";
import Navbar from "./components/Navbar";
import PreviewNote from "./components/PreviewNote";
import "./index.css";
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
import { NoNotesSVG } from "./components/NoNotesSVG";
import { SkeletonLoading } from "./components/SkeletonLoading";
import { NotLoggedInSVG } from "./components/NotLoggedInSVG";

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
            <NoNotesSVG />
          ) : isLoading ? (
            <SkeletonLoading />
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

          <CreateNoteFloatingButton setCreateNewNote={setCreateNewNote} />
        </>
      ) : (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <NotLoggedInSVG openLoginFrom={openLoginFrom} />

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
