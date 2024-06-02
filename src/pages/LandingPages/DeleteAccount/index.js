/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2023 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState } from "react";

// Material Kit 2 React components
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// Authentication
import AuthContext from "context/AuthContext";

function DeleteAccount() {
  const [password, setPassword] = useState("");

  let { logoutUser, deleteUser } = useContext(AuthContext);

  const handleDelete = (e) => {
    e.preventDefault();

    // Sign out before deleting the user
    // Otherwise, the deleted user still maintains their session
    logoutUser();

    deleteUser(password, console.log, console.error);
  };

  return (
    <>
      <MKTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
        Are You Sure?
      </MKTypography>
      <MKTypography variant="p" color="dark" mt={1}>
        Type your password to confirm
      </MKTypography>
      <MKInput
        type="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        fullWidth
      />
      <MKButton
        variant="gradient"
        color="error"
        onClick={handleDelete}
        disabled={!password}
        fullWidth
      >
        delete account
      </MKButton>
    </>
  );
}

export default DeleteAccount;
