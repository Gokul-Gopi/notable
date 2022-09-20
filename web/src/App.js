import { Box, Grid } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
import "./index.css";
import mockData from "./utils/mock-data.json";

function App() {
  return (
    <Box className="App">
      <Navbar />
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="4rem"
        justifyItems="center"
        width={{ base: "90%", lg: "70rem" }}
        // border="1px"
        m="auto"
        py={{ base: "2rem", lg: "4rem" }}
      >
        {mockData.map((e, i) => {
          return <Note key={i} noteDetails={e} />;
        })}
      </Grid>
    </Box>
  );
}

export default App;
