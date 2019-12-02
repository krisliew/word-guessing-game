import axios from "axios";

export default class ApiService {
  async getWords() {
    // Obtained from: updated word phrase from https://www.vocabulary.com/lists/258109 XD
    const response = await axios.get("/words_phrases.json");
    return response.data;
  }
}
