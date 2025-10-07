import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";

const Sidedrawer = () => {
  return (
    <Drawer.Root placement={'start'}>
      <Drawer.Trigger asChild>
        <GiHamburgerMenu color="white"/>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>Wildy</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              ggggggggg
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default Sidedrawer