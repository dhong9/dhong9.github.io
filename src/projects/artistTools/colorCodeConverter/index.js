/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useState } from "react";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Material Kit 2 React page layout routes
import routes from "routes";

// Color picker
import { HexColorPicker } from "react-colorful";

// Images
import bgImage from "assets/images/balloons_sky.png";

function ColorCodeConverter() {
  const [hexColor, setHexColor] = useState("#00ff00"); // Solid green
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(0);
  const [redSmall, setRedSmall] = useState(0);
  const [greenSmall, setGreenSmall] = useState(1);
  const [blueSmall, setBlueSmall] = useState(0);

  /**
   * Converts hex string to RGB
   * @param {String} hex_value hex string in format RRGGBB
   * @returns array representing red, green, and blue in range [0-255]
   */
  const hexToRGB = (hex_value) => {
    const numericValue = parseInt(hex_value, 16);
    const r = (numericValue >> 16) & 0xff;
    const g = (numericValue >> 8) & 0xff;
    const b = numericValue & 0xff;
    return [r, g, b];
  };

  /**
   * Converts RGB value to hex string
   * @param {Number} r red value [0-255]
   * @param {Number} g green value [0-255]
   * @param {Number} b blue value [0-255]
   * @returns hex string #RRGGBB
   */
  const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + +b).toString(16).slice(1);

  /**
   * Updates RGB values based on hex input
   * @param {String} hex_color hex string (#?)RRGGBB
   */
  const handleHexChange = (hex_color) => {
    setHexColor(hex_color);

    // If the string starts with '#', then strip it off
    const revisedHex = hex_color.startsWith("#") ? hex_color.slice(1) : hex_color;

    // Convert hex string to RGB and update input values based on them
    const [r, g, b] = hexToRGB(revisedHex);
    setRed(r);
    setGreen(g);
    setBlue(b);

    // Get 0-1 range equivalent of RGB
    const digits = 3; // Digits after the decimal
    setRedSmall((r / 255).toFixed(digits));
    setGreenSmall((g / 255).toFixed(digits));
    setBlueSmall((b / 255).toFixed(digits));
  };

  /**
   * Updates red color field and hex string
   * @param {Number} red_color red color
   */
  const handleRedChange = (red_color) => {
    const digits = 3;
    setRed(red_color);
    setRedSmall((red_color / 255).toFixed(digits));
    const hexValue = rgbToHex(red_color, green, blue);
    setHexColor(hexValue);
  };

  /**
   * Updates green color field and hex string
   * @param {Number} green_color
   */
  const handleGreenChange = (green_color) => {
    setGreen(green_color);
    const hexValue = rgbToHex(red, green_color, blue);
    setHexColor(hexValue);
  };

  /**
   * Updates blue color field and hex string
   * @param {Number} blue_color
   */
  const handleBlueChange = (blue_color) => {
    setBlue(blue_color);
    const hexValue = rgbToHex(red, green, blue_color);
    setHexColor(hexValue);
  };

  const handleRedSmallChange = (red_color) => {
    setRedSmall(red_color);
    const red255 = (red_color * 255) | 0;
    setRed(red255);
    const hexValue = rgbToHex(red255, green, blue);
    setHexColor(hexValue);
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Color Code Converter
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <HexColorPicker color={hexColor} onChange={setHexColor} />
              </MKBox>
              <MKBox component="form" role="form">
                <MKBox mb={2}>
                  <MKInput
                    type="text"
                    label="Hex Value"
                    onChange={(e) => handleHexChange(e.target.value)}
                    value={hexColor}
                    fullWidth
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="number"
                    label="Red"
                    value={red}
                    onChange={(e) => handleRedChange(e.target.value)}
                  />
                  <MKInput
                    type="number"
                    label="Green"
                    value={green}
                    onChange={(e) => handleGreenChange(e.target.value)}
                  />
                  <MKInput
                    type="number"
                    label="Blue"
                    value={blue}
                    onChange={(e) => handleBlueChange(e.target.value)}
                  />
                </MKBox>
                <Divider variant="middle" />
                <MKBox mb={2}>
                  <MKInput
                    type="number"
                    label="red"
                    value={redSmall}
                    onChange={(e) => handleRedSmallChange(e.target.value)}
                  />
                  <MKInput type="number" label="green" value={greenSmall} />
                  <MKInput type="number" label="blue" value={blueSmall} />
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default ColorCodeConverter;
