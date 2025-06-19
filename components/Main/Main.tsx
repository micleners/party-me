import { Box, Title } from "@mantine/core";

export const Main = () => {

  return (
    <Box m="auto" ta="center" mt={100}>
      <div className="flex flex-col items-center justify-center">
        <Title className="text-4xl font-bold">Welcome to the Main Component</Title>
        <p className="mt-4 text-lg">This is the main content area.</p>
      </div>
    </Box>
  );
};
