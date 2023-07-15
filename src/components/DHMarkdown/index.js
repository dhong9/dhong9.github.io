import ReactMarkdown from "react-markdown";

// MUI components
import Link from "@mui/material/Link";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

const components = {
  h1: ({ children, ...props }) => (
    <MKTypography gutterBottom variant="h4" component="h1" {...props}>
      {children}
    </MKTypography>
  ),
  h2: ({ children, ...props }) => (
    <MKTypography gutterBottom variant="h6" component="h2" {...props}>
      {children}
    </MKTypography>
  ),
  h3: ({ children, ...props }) => (
    <MKTypography gutterBottom variant="subtitle1" {...props}>
      {children}
    </MKTypography>
  ),
  h4: ({ children, ...props }) => (
    <MKTypography gutterBottom variant="caption" paragraph {...props}>
      {children}
    </MKTypography>
  ),
  p: ({ children, ...props }) => (
    <MKTypography paragraph {...props}>
      {children}
    </MKTypography>
  ),
  a: ({ children, ...props }) => <Link {...props}>{children}</Link>,
  li: ({ children, ...props }) => (
    <MKBox component="li" sx={{ mt: 1, typography: "body1" }} {...props}>
      {children}
    </MKBox>
  ),
};

export default function DHMarkdown(props) {
  return <ReactMarkdown components={components} {...props} />;
}
