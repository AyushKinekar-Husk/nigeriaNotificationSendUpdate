// viewmodels/AppViewModel.ts
import Cookies from "js-cookie";
import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/userSlice";
import { decryptStringFromBytes } from "../utils/decrypt";
import { RootState } from "../store";
import { userService } from "../services/userService";


export const AppViewModel = () => {
  const [allowed, setAllowed] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [userId,setUserid] = useState<string | null>(null);
  const dispatch = useDispatch();

  interface UserData {
    name?: string;
    email?: string;
    [key: string]: any;
  }

  const userData = useSelector<RootState, UserData>((state) => state.user.userData as UserData);

  // Step 1: Gatekeeping by domain
  useEffect(() => {
    // const referrer = document.referrer;
    // if (referrer.startsWith("https://qa.huskneuron.com")) {
    //   setAllowed(true);
    // } else {
    //   alert("Access denied: Unauthorized parent domain.");
    //   window.location.href = "https://qa.huskneuron.com";
    // }

    // Step 2: Listen for cookies from parent window
    const messageHandler = (event: any) => {
      if (event.origin !== "https://qa.huskneuron.com") return;

      if (event.data === "logout") {
        Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
      } else if (event.data.type === "init") {
        const receivedCookies = event.data.data;
        Object.keys(receivedCookies).forEach((key) => {
          Cookies.set(key, receivedCookies[key]);
        });

        dispatch(
          setUser({
            name: receivedCookies.name || "",
            email: receivedCookies.email || "",
            userData: receivedCookies,
          })
        );
        setAppReady(true);
      }

      window.opener?.postMessage("Cookies processed", "https://qa.huskneuron.com");
    };

    window.addEventListener("message", messageHandler);

    // Step 3: Support reload with existing cookies
    // const existingCookies = Cookies.get();
    // if (existingCookies && Object.keys(existingCookies).length > 0) {
    //   dispatch(
    //     setUser({
    //       name: existingCookies.name || "",
    //       email: existingCookies.email || "",
    //       userData: existingCookies,
    //     })
    //   );
    //   setAppReady(true);
    // }

    return () => window.removeEventListener("message", messageHandler);
  }, [dispatch]);

  // Step 4: Fetch user details only after all gates pass
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const Encryptkeyvalue = "8080808080808080";
        const userObj = userData as Record<string, any>;
        const encryptedEmail = userObj["husk.user"];

        if (encryptedEmail) {
          const decryptedEmail = decryptStringFromBytes(
            encryptedEmail,
            Encryptkeyvalue,
            Encryptkeyvalue
          );

          if (decryptedEmail) {
            const userDetails = await userService.getUserDetailsByEmail(decryptedEmail);
            dispatch(
              setUser({
                name: userData?.name || "",
                email: userData?.email || "",
                userData,
                userDetails: userDetails || {},
              })
            );
            setUserid(userDetails?.id || null);
            console.log("User details fetched and decrypted successfully:", userDetails,userDetails?.id);
          }
        }
      } catch (error) {
        console.error("Error fetching/decrypting user details", error);
      }
    };

    // if (allowed && appReady && userData && Object.keys(userData).length > 0) {
      fetchUserDetails();
    // }
  }, [allowed, appReady, userData, dispatch]);

  return {
    allowed,
    appReady,
    userData,
    userId,
  };
};
