import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  Link,
  Spinner, 
  Center,
  Box
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();


  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container>
        <Center>
          <Heading margin={"10px"}>
            🪄Stable DIffusion🪄
          </Heading>
        </Center>
        <Center>
        <Text margin={"5px"}>
          A simple react application that leverages the model trained by <emp>Stability AI</emp> and
          <emp>Runway ML</emp> to generate images using the <emp>Stable Diffusion</emp> Deep Learning
          model. The model can be found via {" "}
          <Link target={"_balank"} href={"https://github.com/CompVis/stable-diffusion"}>
            this Github Repo
          </Link>
        </Text>
        </Center>
        <Center>
        <Wrap margin={"5px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>
        </Center>
        
        <Center>
        {loading ? (
          <Stack>
            <Text margin={"5px"}>Generating Image...</Text>
            <Center><Spinner /></Center>
            
          </Stack>
        ) : image ? (
          
          <Box>
            <Image margin={"5px"} src={`data:image/png;base64,${image}`} boxShadow="lg" />
            <Center>
            <Text mt={2} fontSize="sm" color="gray.500">
              Caption : {prompt}
            </Text>
            </Center>
            
          </Box>
          
        ) : null}
        </Center>
      </Container>
    </ChakraProvider>
  );
};

export default App;