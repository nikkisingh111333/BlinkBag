
import { Permissions, webMethod } from "wix-web-module";
import { authentication } from "wix-members-backend";
import { triggeredEmails } from "wix-crm-backend";

export const signupnow = webMethod(
  Permissions.Anyone,
  async (email, password,Name) => {
    const registrationOptions = {
       contactInfo: {
         firstName: Name
         
       },
     };
    const registration = await authentication.register(
      email,
      password,
      registrationOptions
    );
    console.log("Member is now registered with the site and pending approval");

    const emailOptions = {
      variables: {
        name: Name,
        verifyLink: `https://nikkikkc04.wixstudio.com/vertise/postregister?token=${registration.approvalToken}`,
      },
    };
    triggeredEmails.emailMember(
      "verifyRegistration",
      registration.member._id,
      emailOptions,
    );
    console.log("Confirmation email sent",registration.status,registration.approvalToken);
    return registration
  },
);

export const doApproval = webMethod(Permissions.Anyone, async (token) => {
  try {
    const sessionToken = await authentication.approveByToken(token);
    console.log("Member approved");
    return {
      approved: true,
      sessionToken: sessionToken,
    };
  } catch (error) {
    console.log("Member not approved");
    return {
      approved: false,
      reason: error,
    };
  }
});
export const justApproveByEmail = webMethod(
  Permissions.Anyone,
  (email) => {
    return authentication
      .approveByEmail(email)
      .then((sessionToken) => {
        return {
          sessionToken: sessionToken,
          approved: true,
        };
      })
      .catch((error) => {
        return {
          approved: false,
          reason: error,
        };
      });
  },
);
