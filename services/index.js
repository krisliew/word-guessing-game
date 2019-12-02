import AuthService from "./AuthService";
import GameService from "./GameService";
import ApiService from "./ApiService";

const apiService = new ApiService();
export const authService = new AuthService(process.browser ? localStorage : null);
export const gameService = new GameService(authService, apiService);
