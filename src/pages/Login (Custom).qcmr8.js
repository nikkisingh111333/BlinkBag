// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {login,therole} from "backend/roles-login.web"
import { authentication } from "wix-members-frontend";
import { lightbox } from "wix-window-frontend";
import wixWindowFrontend from "wix-window-frontend";

// ...


$w.onReady(async function () {
     $w("#loginform").onMessage(async(fields)=>{
        console.log("Login Start",fields.data.user,fields.data.pass)

		var result =await login(fields.data.user,fields.data.pass)
		// console.log(result.session.token)
		authentication.applySessionToken(result.session.token).then(() => {
  		console.log("Member logged in.");
		if(result.session.token!=''){
			wixWindowFrontend.lightbox.close()
		}
	});

	 })

	 
	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});