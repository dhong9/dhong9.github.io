import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const components = {
  components: {
    h1: ({ ...props }) => <Typography gutterBottom={true} variant="h4" component="h1" {...props} />,
    h2: ({ ...props }) => <Typography gutterBottom={true} variant="h6" component="h2" {...props} />,
    h3: ({ ...props }) => <Typography gutterBottom={true} variant="subtitle1" {...props} />,
    h4: ({ ...props }) => (
      <Typography gutterBottom={true} variant="caption" paragraph={true} {...props} />
    ),
    p: ({ ...props }) => <Typography paragraph={true} {...props} />,
    a: "@mui/material/Link",
    li: ({ ...props }) => <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />,
  },
};

export default function DHMarkdown(props) {
  return <ReactMarkdown components={components} {...props} />;
}
