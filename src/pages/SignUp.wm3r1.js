// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from "wix-data";
import wixWindowFrontend from "wix-window-frontend";
import wixLocationFrontend from "wix-location-frontend";


import {signupnow,justApproveByEmail} from "backend/signup.web"
import { authentication, currentMember } from "wix-members-frontend";
import { openLightbox } from "wix-window-frontend";
import { subscribe, unsubscribe } from "wix-realtime-frontend";
$w.onReady(async function () {
  let company=''
  let emails=''
  let pass=''
  let address=''
  
  let business_type=''
  let phone=''
  let point_1=''
  let point_2=''
  let point_3=''
  let point_4=''
  let restro=''
	if (authentication.loggedIn()) {
     let member = await currentMember.getMember();
      $w("#signupform").hide()
      $w("#already").show()
    // intializeMember(member._id);
  } else {
    console.log("Not Logged In")
    $w("#already").hide()
	  $w("#signupform").show()
      // Click "Run", or Preview your site, to execute your code
    $w("#signupform").onSubmit((fields) => {
      console.log(fields)
      company = fields.company_name;
      emails = fields.email_address;
      pass = fields.password;
      address = fields.multi_line_addres;
      business_type=fields['is_your_business_type']
      phone=fields.phone_928e
      point_1=fields.latitude //Its Point_1
      point_2=fields.point_2 //Its Point 2
      point_3=fields.point_3
      point_4=fields.point_4
      restro=fields.longitude
      let addressL=address["addressLine"]
      let pin=address["postalCode"]
      let country=address["country"]
      console.log(business_type)
      const submit = $w("#signupform").onSubmitSuccess(async () => {
        console.log("The Data:",company,emails,pass)
        
        const signup_token=await signupnow(emails,pass,company)
          const dataToSend = {
          email: emails,
          name:company,
          token:signup_token.sessionToken,
          status:signup_token.status,
          approval:signup_token.approvalToken
        };
        var session=await justApproveByEmail(dataToSend.email)
        // console.log(session)
        // console.log(`/postregister?email=${emails}&name=${company}&token=${session}&status=${signup_token.status}&approval=${signup_token.approvalToken}`)
        wixLocationFrontend.to(`/postregister?country=${country}&pin=${pin}&address=${addressL}&restro_point=${restro}&point_1=${point_1}&point_2=${point_2}&point_3=${point_3}&point_4=${point_4}&biz_type=${business_type}&phone=${phone}&email=${emails}&name=${company}&token=${session.sessionToken}&status=${signup_token.status}&approval=${session.approved}`);
          // console.log("Form submitted successfully!",signup_token);
          // wixWindowFrontend.openLightbox("verify",dataToSend);
          
    // /
        
        // wixWindowFrontend.lightbox.close(dataToSend);

      });
//   $w('#myText').text = `Thank you, ${firstName} ${lastName}, for your generous donation of ${donation}.`;
});
	
  }
	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

});
