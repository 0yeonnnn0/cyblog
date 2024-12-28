import Router from "next/router";
import { showErrorAlert } from "../join/joinController";
import { loginByFirebase } from "./loginModel";
import { AuthCredentials } from "../join/joinModel";
import { useUserStore } from "@/store/userStore";

export const logInController = {
  async logIn({ email, password }: AuthCredentials) {
    try {
      const userData = await loginByFirebase({ email, password });

      if (userData) {
        const { setUser } = useUserStore.getState();
        setUser(userData);
        console.log(useUserStore.getState().user);
      } else {
        showErrorAlert("Error : ", "Invalid email or password.");
      }
      return userData;
    } catch (error) {
      showErrorAlert("Error", `Firebase authentication failed: ${error}`);
    }
  },
};
