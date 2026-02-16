// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// DH Components
import DHDropzone from "components/DHDropzone";

// Material Kit 2 React page layout routes
import routes from "routes";

// Services
//import { getImages } from "services/imageConverterService";

function ImageToSpreadsheet() {
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <DHDropzone />
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default ImageToSpreadsheet;
