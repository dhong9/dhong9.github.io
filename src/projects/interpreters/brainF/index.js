// Sections components
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";

// BrainF code
import brainFCode from "projects/interpreters/brainF/code";

// Generic interpreter
import Interpreter from "../interpreter";

// Form
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MKButton from "components/MKButton";
import MKBox from "components/MKBox";

// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React, { useState } from "react";

function BrainF() {
  const [visualize, setVisualize] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [codeSrc, setCodeSrc] = useState("// some comment");
  const [cells, setCells] = useState({});

  const handleChange = (event) => {
    setVisualize(event.target.checked);
  };

  const showOutput = () => {
    setCodeOutput(brainF(codeSrc));
  };

  /**
   * Processes BrainF code and returns its output
   * @param {String} src source code
   * @returns aggregate of all char prints
   */
  const brainF = (src) => {
    // Clear all cells
    setCells({});

    let i = 0; // Current cell
    let res = "";

    // Operator functions
    const moveRight = (c) => {
      i++;
      return c;
    };
    const moveLeft = (c) => {
      i = Math.max(i - 1, 0);
      return c;
    };
    const increment = (c) => {
      cells[i] = (cells[i] || 0) + 1;
      return c;
    };
    const decrement = (c) => {
      cells[i] = cells[i] ? cells[i] - 1 : 255;
      return c;
    };
    const print = (c) => {
      res += String.fromCharCode(cells[i]);
      return c;
    };
    const beginLoop = (c) => {
      c = cells[i] ? c : [...src].findIndex((v, j) => j > c && v === "]") + 1;
      return c;
    };
    const endLoop = (c) => {
      if (cells[i]) {
        let j = 0;
        for (let k = 0; k < c; k++) {
          if (src[k] === "[") j = k;
        }
        c = j;
      }
      return c;
    };

    // Valid operations
    const ops = {
      ">": moveRight,
      "<": moveLeft,
      "+": increment,
      "-": decrement,
      ".": print,
      ",": null,
      "[": beginLoop,
      "]": endLoop,
      "!": null,
    };

    for (let c = 0; c < src.length; c++) {
      if (src[c] in ops) {
        c = ops[src[c]](c);
      }
    }

    setCells(cells);

    return res;
  };

  return (
    <BaseLayout
      title="Page Headers"
      breadcrumb={[
        { label: "Page Sections", route: "/sections/page-sections/page-headers" },
        { label: "Page Headers" },
      ]}
    >
      <View title="Header 1" code={brainFCode} height="40rem">
        {visualize && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ display: "table-header-group" }}>
                <TableRow>
                  <TableCell>Cell Number</TableCell>
                  <TableCell align="left">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(cells).map((v) => (
                  <TableRow key={v} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {v}
                    </TableCell>
                    <TableCell align="left">{cells[v]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Interpreter codeUpdate={setCodeSrc} language="brainF" />
      </View>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={visualize} onChange={handleChange} />}
          label="Visualize"
        />
        <MKButton onClick={showOutput} type="submit" variant="gradient" color="info">
          Show value
        </MKButton>
      </FormGroup>

      {codeOutput && (
        <MKBox
          borderRadius="lg"
          shadow="lg"
          p={2}
          mt={2}
          component="div"
          sx={{ display: "inline" }}
        >
          {codeOutput}
        </MKBox>
      )}
    </BaseLayout>
  );
}

export default BrainF;