import { getAuth, updateProfile } from "firebase/auth";

async function updateUsername(newUsername: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        displayName: newUsername, // username을 displayName으로 설정
      });
      console.log("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
    }
  } else {
    console.log("No user is currently logged in.");
  }
}
