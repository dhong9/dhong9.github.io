import { useEffect, useContext } from "react";

// Authorization
import AuthContext from "context/AuthContext";

function SignOutBasic() {
  const { profile, logoutUser, gmailLogout } = useContext(AuthContext);

  useEffect(profile ? gmailLogout : logoutUser, []);

  return <div>Logging out...</div>;
}

export default SignOutBasic;
