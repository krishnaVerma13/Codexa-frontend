import axios from "axios";

const url = "https://ce.judge0.com/submissions?wait=true";

interface Judge0Response {
    stdout: string | null;
    stderr: string | null;
    status: {
        id: number;
        description: string;
    };
    compile_output: string | null;
    message: string | null;
}

interface RunCodeResult {
    output: string | null;
    error: string | null;
    status: string;
    compileError: string | null;
}

export const RunCodeApi = async (code : string , id : number):Promise<RunCodeResult> => {
    try {
    const response = await axios.post<Judge0Response>(
        url,
        {
            source_code: code,
            language_id: id,
            stdin :"",
        },
        {
            headers: {"Content-Type": "application/json",},
            timeout: 10000, // 10 seconds timeout
        }
    );

    return {
      output: response.data.stdout,
      error: response.data.stderr,
      status: response.data.status?.description,
      compileError: response.data.compile_output,
    };
   
}
    catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error("Execution timed out");
      }
      throw new Error(error.response?.data?.message || "Execution failed");
    }
    throw new Error("Something went wrong");
}

}