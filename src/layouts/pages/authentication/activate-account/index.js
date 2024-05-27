/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useParams } from "react-router-dom";

// Danyo pages
import ActivateAccountBasic from "pages/LandingPages/ActivateAccount";

export default function ActivateAccountPage() {
  const { uid, token } = useParams();

  return <ActivateAccountBasic uid={uid} token={token} />;
}
