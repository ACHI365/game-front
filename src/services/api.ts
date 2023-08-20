import axios from "axios";
import { Session } from "../context/MainContext";

const API_BASE_URL = process.env.REACT_APP_BACK_URL;


export const createGameSession = async (data: any): Promise<Session> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Game/create-session`, data);
    return response.data;
  } catch (error) {
      console.log(error);
      throw error    
  }
};

export const fetchGameSessions = async (): Promise<Session[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/Game/get-sessions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const joinGameSession = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Game/join-session?roomId=${data.roomId}&playerName=${data.playerName}`);
    return response.data;
  } catch (error) {
      console.log(error);
      throw error    
  }
};

export const leaveGameSession = async (data: any) => {
  try {
    await axios.post(`${API_BASE_URL}/api/Game/leave-session?roomId=${data.roomId}&playerName=${data.playerName}`);
  } catch (error) {
      console.log(error);
      throw error    
  }
};
