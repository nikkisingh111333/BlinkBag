// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { lightbox } from "wix-window-frontend";
import { authentication } from "wix-members-frontend";

$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API
	
	// $w('#verifyframe').scrolling="no"
	let receivedData = lightbox.getContext();
	// $w("#verifyframe").onMessage((event) => {
    
	// authentication.verifyEmail(`${event.data}`).then(() => {
	// 		console.log("OTP verified");
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error verifying OTP:", error);
	// 	});
  	// });
	
	console.log("Data is here:",receivedData)
	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});