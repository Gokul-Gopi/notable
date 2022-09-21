import { Box, Grid } from "@chakra-ui/react";
import CreateNoteFloatingButton from "./components/CreateNoteFloatingButton";
import CreateNoteInput from "./components/CreateNoteInput";
import Navbar from "./components/Navbar";
import PreviewNote from "./components/PreviewNote";
import "./index.css";
import mockData from "./utils/mock-data.json";

function App() {
  return (
    <Box className="App">
      <Navbar />
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

      <CreateNoteFloatingButton />
    </Box>
  );
}

export default App;
