import ReactMarkdown from "react-markdown";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

const components = {
  components: {
    h1: ({ ...props }) => (
      <MKTypography gutterBottom={true} variant="h4" component="h1" {...props} />
    ),
    h2: ({ ...props }) => (
      <MKTypography gutterBottom={true} variant="h6" component="h2" {...props} />
    ),
    h3: ({ ...props }) => <MKTypography gutterBottom={true} variant="subtitle1" {...props} />,
    h4: ({ ...props }) => (
      <MKTypography gutterBottom={true} variant="caption" paragraph={true} {...props} />
    ),
    p: ({ ...props }) => <MKTypography paragraph={true} {...props} />,
    a: "@mui/material/Link",
    li: ({ ...props }) => <MKBox component="li" sx={{ mt: 1, typography: "body1" }} {...props} />,
  },
};

export default function DHMarkdown(props) {
  return <ReactMarkdown components={components} {...props} />;
}
