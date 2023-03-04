import axios from "axios";
export default async function getCommonSongs(playlistUrls) {
  try {
    const response = await axios.post(
      "http://46.101.160.105:80/common_songs",
      playlistUrls
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}
