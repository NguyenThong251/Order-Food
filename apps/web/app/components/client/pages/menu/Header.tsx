import { useDisclosure } from "@mantine/hooks";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Flex,
  Group,
  IconSearch,
  NumberInput,
  Tabs,
  Text,
  rem,
  useMantineTheme,
} from "@repo/ui";
import { useState } from "react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./header.module.css";

const tabs = ["All Categories", "All", "Pizza", "Pho", "Lau"];

export function Header() {
  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <Box py={20}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Text fw={600} fz={20}>
            Categories
          </Text>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            visibleFrom="xs"
          />
        </Group>
      </Container>
      <Container size="md">
        <Flex align="center" justify="space-between">
          <Tabs
            defaultValue="All Categories"
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
          <Box>
            <Flex align="end" gap={5}>
              <NumberInput label="From Price" />
              <NumberInput label="To Price" />
              <Button variant="filled" color="red">
                Filter
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
