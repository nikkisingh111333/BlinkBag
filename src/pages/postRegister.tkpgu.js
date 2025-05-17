// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from "wix-data";
import wixWindowFrontend from "wix-window-frontend";
import {signupnow,justApproveByEmail,doApproval} from "backend/signup.web"
import { authentication, currentMember } from "wix-members-frontend";
import { openLightbox } from "wix-window-frontend";
import { subscribe, unsubscribe } from "wix-realtime-frontend";
import { lightbox } from "@wix/site-window";
import wixLocationFrontend from "wix-location-frontend";
$w.onReady(async function () {
	console.log("post register page")
    var params=wixLocationFrontend.query
	const token = wixLocationFrontend.query.token;
	console.log(params)
  	
	
	if (params.approval=='true'){
		console.log("Approved")
		
		// Heres our Insert code for account
		 // get country item from somewhere
		 let biz_type=""
		if(params.biz_type=="An Restaurant Or Food Spot"){
			biz_type="restro"
		}
		else{
			biz_type="ordinary"
		}
        
		let toInsert = {
		"businessName":params.name,
		"email":params.email,
		"phoneNumber":params.phone,
		"address":params.address,
		"pincode":params.pincode,
		"latitude":params.restro_point.split(",")[0].trim(),
		"longitude":params.restro_point.split(",")[1].trim(),
		"country":params.country,
		"business_type":biz_type,
		"locationBox":{"point_1":params.point_1,"point_2":params.point_2,
		"point_3":params.point_3,"point_4":params.point_4}
		};

		 wixData.insert("BusinessAccounts", toInsert)
		.then((results) => {
		 	console.log(results); //see item below
		 })
		 .catch((err) => {
		 	console.log(err);
		 });
		authentication.applySessionToken(params.token);
      	console.log("Member approved & logged in");

	} else {
		console.log("Member not approved");
	}
	

	// wixWindowFrontend.openLightbox("verify",params);
	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});