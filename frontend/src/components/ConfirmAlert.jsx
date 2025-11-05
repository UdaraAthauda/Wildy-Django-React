import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"

const ConfirmAlert = ({btnName, message, onConfirm, btnColor}) => {
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)

        try {
            await onConfirm()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="subtle" colorPalette={btnColor}>
          {btnName}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                {message}
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={btnColor} onClick={handleConfirm} loading={loading} loadingText="Processing...">{btnName}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ConfirmAlert