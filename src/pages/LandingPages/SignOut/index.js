import { useEffect, useContext } from "react";

// Authorization
import AuthContext from "context/AuthContext";

function SignOutBasic() {
  const { googleUser, logoutUser, gmailLogout } = useContext(AuthContext);

  useEffect(googleUser ? gmailLogout : logoutUser, []);

  return <div>Logging out...</div>;
}

export default SignOutBasic;
