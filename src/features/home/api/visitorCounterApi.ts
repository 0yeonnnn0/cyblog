import axios from "axios";

export const getVisitorCount = async () => {
  const { data } = await axios.get("/api/visitorcounter");
  return data;
};

export const incrementVisitorCount = async () => {
  const { data } = await axios.post("/api/visitorcounter");
  return data;
};
