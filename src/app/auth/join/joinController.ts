import Router from "next/router";
import { AuthCredentials, registerByFirebase } from "./joinModel";

export const showErrorAlert = (title: string, message: string) => {
  console.error(title, message);
};

export const joinController = {
  async join({ email, password, username }: AuthCredentials) {
    try {
      const token = await registerByFirebase({ email, password, username });
      if (token) {
        Router.push("/login"); // 이동할 페이지 경로 지정
      } else {
        showErrorAlert("Error : ", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      showErrorAlert("Error", `Firebase authentication failed: ${error}`);
    }
  },
};
