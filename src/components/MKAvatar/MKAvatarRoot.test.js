/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React testing libraries
import { render } from "@testing-library/react";

// Material Kit 2 React themes
import theme from "assets/theme";

// Component to test
import MKAvatarRoot from "components/MKAvatar/MKAvatarRoot";

describe("MKAvatar", () => {
  it("renders extra small transparent avatars", () => {
    const ownerState = {
      bgColor: "transparent",
      size: "xs",
    };

    const { container } = render(<MKAvatarRoot theme={theme} ownerState={ownerState} />);

    expect(container).toMatchSnapshot();
  });

  it("renders small primary avatars", () => {
    const ownerState = {
      bgColor: "primary",
      size: "sm",
    };

    const { container } = render(<MKAvatarRoot theme={theme} ownerState={ownerState} />);

    expect(container).toMatchSnapshot();
  });

  it("renders large secondary avatars", () => {
    const ownerState = {
      bgColor: "secondary",
      size: "lg",
    };

    const { container } = render(<MKAvatarRoot theme={theme} ownerState={ownerState} />);

    expect(container).toMatchSnapshot();
  });

  it("renders extra large info avatars", () => {
    const ownerState = {
      bgColor: "info",
      size: "xl",
    };

    const { container } = render(<MKAvatarRoot theme={theme} ownerState={ownerState} />);

    expect(container).toMatchSnapshot();
  });

  it("renders default success avatars", () => {
    const ownerState = {
      bgColor: "success",
      size: "ddh",
    };

    const { container } = render(<MKAvatarRoot theme={theme} ownerState={ownerState} />);

    expect(container).toMatchSnapshot();
  });
});
