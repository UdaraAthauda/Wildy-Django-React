import api from "@/api";
import { Button, Group, Input } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

const Searchbar = ({onSearchResults, onBack}) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("")
  const [back, setBack] = useState(false)

  const handleBackToHome = () => {
    setQuery("")
    setBack(false)
    onBack();
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setBack(true)

    try {
        const res = await api.get(`wild/snakes/?search=${query}`)

        if (res.data.length === 0) {
          onSearchResults([{message: 'no_content'}])
        } else {
          onSearchResults(res.data)
        }
        
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
  }

  return (
    <>
    <Group as={"form"} onSubmit={handleSearch} attached w="full" maxW="sm">
      <Input
        colorPalette={"green"}
        size={"sm"}
        flex="1"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <Button
        type="submit"
        size={"sm"}
        colorPalette={"green"}
        variant="outline"
        loading={loading}
        loadingText="Searching..."
      >
        <LuSearch /> Search
      </Button>
      {back && <Button ml={2} size={'sm'} onClick={handleBackToHome}>Go Back</Button>}
    </Group>
    </>
  );
};

export default Searchbar;
