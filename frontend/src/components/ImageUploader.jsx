import { Box, FileUpload, Icon } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"

const ImageUploader = ({onFileSelect}) => {
  const handleFileChange = (details) => {
    const file = details.acceptedFiles[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <FileUpload.Root alignItems="stretch" maxFiles={1} accept="image/*" onFileChange={handleFileChange}>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop image file here</Box>
          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  )
}

export default ImageUploader