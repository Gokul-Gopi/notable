import { Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

export const SkeletonLoading = () => {
  return (
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
  );
};
