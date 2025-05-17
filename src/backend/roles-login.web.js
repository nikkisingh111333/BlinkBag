import { currentMember } from "wix-members-backend";
import { Permissions, webMethod } from "wix-web-module";
import { authentication } from "wix-members.v2";

import { elevate } from "wix-auth";

const elevatedLogin = elevate(authentication.login);
export const therole = webMethod(Permissions.Anyone, () => {
  return currentMember
    .getRoles()
    .then((roles) => {
      return roles;
    })
    .catch((error) => {
      console.error(error);
    });
});

export const login = webMethod(
  Permissions.Anyone,
  async (email, password) => {
    console.log("LOGIN Begins ")
    try {
      const result = await elevatedLogin(email, password);
      return result;
    } catch (error) {
      console.log("Problem")
      console.error(error);
      // Handle the error
    }
  },
);