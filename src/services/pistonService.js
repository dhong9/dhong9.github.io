/**
=========================================================
* Danyo-1.2
=========================================================

* Copyright 2024 Danyo (https://www.danyo.tech)

Coded by www.danyo.tech

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Base services
import { getRequest, postRequest } from "services/baseService";

// Pistion code exeucution base URL
const baseURL = "https://emkc.org/api/v2/piston/";

export const getRunTimes = (success) => {
  getRequest("runtimes", success, console.error, baseURL);
};

export const executeCode = (language, version, fileName, fileContent, success) => {
  const data = {
    language,
    version,
    files: [
      {
        name: fileName,
        content: fileContent,
      },
    ],
    stdin: "",
    args: [],
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  };

  postRequest("execute", data, success, console.error, {}, baseURL);
};
