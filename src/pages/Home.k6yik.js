// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from "wix-data";
import { authentication, currentMember } from "wix-members-frontend";
import { openLightbox } from "wix-window-frontend";
import wixWindowFrontend from "wix-window-frontend";
import { subscribe, unsubscribe } from "wix-realtime-frontend";
import wixLocationFrontend from "wix-location-frontend";
import {signupnow} from "backend/signup.web"
import { lightbox } from "wix-window-frontend";
import {therole} from "backend/roles-login.web"
//ns147940@gmail.com
$w.onReady(async function () {
 
  // wixLocationFrontend.to("/postregister");
if (authentication.loggedIn()) {
    const role=await therole()
    console.log("Role:",role)
    let member = await currentMember.getMember();
    
    // intializeMember(member._id);
  } else {
    // subscribeToVisitorChannel();
  }
	
});