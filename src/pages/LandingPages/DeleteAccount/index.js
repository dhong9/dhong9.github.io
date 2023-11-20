/**
=========================================================
* Danyo-1.1
=========================================================

* Copyright 2023 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// Material Kit 2 React examples
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

function DeleteAccount() {
  const [username, setUsername] = useState("");

  return (
    <>
      <MKTypography variant="h4" fontWeight="medium" color="black" mt={1}>
        Are You Sure?
      </MKTypography>
      <MKTypography variant="p" color="black" mt={1}>
        Type your username <strong>Guest</strong> to confirm.
      </MKTypography>
      <MKInput
        type="text"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        fullWidth
      />
    </>
  );
}

export default DeleteAccount;
