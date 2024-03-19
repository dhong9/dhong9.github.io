import { useEffect, useContext } from "react";

// Authorization
import AuthContext from "context/AuthContext";

function SignOutBasic() {
  const { logoutUser } = useContext(AuthContext);

  useEffect(logoutUser, []);

  return <div>Logging out...</div>;
}

export default SignOutBasic;
