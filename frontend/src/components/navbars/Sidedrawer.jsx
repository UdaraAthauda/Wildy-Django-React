import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";

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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
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