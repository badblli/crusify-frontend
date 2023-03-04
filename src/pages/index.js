import { useState } from "react";
import getCommonSongs from "../pages/api/common_songs";
import {
  Box,
  Flex,
  Input,
  Button,
  Image,
  Text,
  Heading,
  VStack,
  Avatar,
  Spinner,
} from "@chakra-ui/react";

export default function Home() {
  const [playlistUrls, setPlaylistUrls] = useState(["", ""]);
  const [commonSongs, setCommonSongs] = useState({
    common_songs: [], playlist1_info: {},
    playlist2_info: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await getCommonSongs(playlistUrls);
    setIsLoading(false);
    setCommonSongs(response);
  }

  return (
    <Flex flexDirection={{ base: "column", md: "row" }} justify="center">
      <Box flex={{ base: "1", md: "0.5" }} mb={{ base: "4", md: "0" }}>
        <Flex as="form" onSubmit={handleSubmit} mb="4">
          <VStack align="stretch">
            <Box>
              <Heading as="label" htmlFor="playlist1" fontSize="md">
                Playlist 1:
              </Heading>
              <Input
                id="playlist1"
                type="text"
                value={playlistUrls[0]}
                onChange={(event) =>
                  setPlaylistUrls([event.target.value, playlistUrls[1]])
                }
              />
            </Box>
            <Box>
              <Heading as="label" htmlFor="playlist2" fontSize="md">
                Playlist 2:
              </Heading>
              <Input
                id="playlist2"
                type="text"
                value={playlistUrls[1]}
                onChange={(event) =>
                  setPlaylistUrls([playlistUrls[0], event.target.value])
                }
              />
            </Box>
            <Button
              type="submit"
              leftIcon={isLoading && <Spinner size="sm" />}
              colorScheme="green"
            >
              {isLoading ? "Loading..." : "Get Common Songs"}
            </Button>
          </VStack>
        </Flex>
      </Box>

      <Box flex={{ base: "1", md: "0.5" }}>
        {isLoading ? (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        ) : commonSongs.common_songs.length > 0 ? (

          <VStack align="center">
            <Flex direction={{ base: "column", md: "row" }} justifyContent={{ md: "space-between" }}>
              <Box borderWidth="1px" borderRadius="lg" p="4" mb="4" display="flex" flexDirection={{ base: "column", md: "row" }} flex="1" maxWidth={{ base: "none", md: "calc(50% - 1rem)" }}>
                <Image
                  src={commonSongs.playlist1_info.cover_image}
                  alt={`${commonSongs.playlist1_info.playlist_name} playlist cover`}
                  w="100px"
                  h="100px"
                  mr={{ md: "4" }}
                />
                <Box flex="1">
                  <Heading as="h2" size="md" mb="2">
                    {commonSongs.playlist1_info.playlist_name}
                  </Heading>
                  <Text>
                    <Avatar
                      src={commonSongs.playlist1_info.playlist_creator.profile_image}
                      name={`${commonSongs.playlist1_info.playlist_creator.id} album cover`}
                      w="50px"
                      h="50px"
                      mr="4"
                    />{commonSongs.playlist1_info.playlist_creator.name}
                  </Text>
                  <Text>
                    <strong>Total Tracks:</strong> {commonSongs.playlist1_info.total_tracks}
                  </Text>
                </Box>
              </Box>
              <Box borderWidth="1px" borderRadius="lg" p="4" mb="4" display="flex" flexDirection={{ base: "column", md: "row" }} flex="1" maxWidth={{ base: "none", md: "calc(50% - 1rem)" }}>
                <Image
                  src={commonSongs.playlist2_info.cover_image}
                  alt={`${commonSongs.playlist2_info.playlist_name} playlist cover`}
                  w="100px"
                  h="100px"
                  mr={{ md: "4" }}
                />
                <Box flex="1">
                  <Heading as="h2" size="md" mb="2">
                    {commonSongs.playlist2_info.playlist_name}
                  </Heading>
                  <Text>
                    <Avatar
                      src={commonSongs.playlist2_info.playlist_creator.profile_image}
                      name={`${commonSongs.playlist2_info.playlist_creator.id} album cover`}
                      w="50px"
                      h="50px"
                      mr="4"
                    /> {commonSongs.playlist2_info.playlist_creator.name}
                  </Text>
                  <Text>
                    <strong>Total Tracks:</strong> {commonSongs.playlist2_info.total_tracks}
                  </Text>
                </Box>
              </Box>
            </Flex>



            <Text>{commonSongs.num_common_songs} ortak şarkı bulunuyor.</Text>
            <Text>{commonSongs.total_songs} Toplam Şarkı</Text>
            <Text>%{commonSongs.percent_common_songs} Eşleşme Oranı</Text>
            <Box overflowY="scroll" h="400px">
              {commonSongs.common_songs.map((song) => (
                <Box key={song.name}>
                  <Flex alignItems="center">
                    <Image
                      src={song.album_cover}
                      alt={`${song.name} album cover`}
                      w="100px"
                      h="100px"
                      mr="4"
                    />
                    <VStack align="stretch">
                      <Heading as="h3" size="md">
                        {song.name}
                      </Heading>
                      <Text>{song.artists.join(", ")}</Text>
                      <Text>Released: {song.album_release_date}</Text>
                    </VStack>
                  </Flex>
                </Box>
              ))}
            </Box>


          </VStack>
        ) : (
          <Text>{commonSongs.detail}</Text>
        )}
      </Box>
    </Flex>

  );
}
