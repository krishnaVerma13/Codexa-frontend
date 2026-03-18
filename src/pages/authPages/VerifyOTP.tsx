import { useState, useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyOTPApi } from "../../services/NwConfig";
import Swal from "sweetalert2";

interface ResStatus {
  success: boolean;
  message: string;
}

export default function VerifyOTP() {

  const navigator = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [resStatus, setResStatus] = useState<ResStatus>({
    success: false,
    message: "",
  })
  const [isLoading, setLoading] = useState<boolean>(false)

  const userEmail = useLocation();

  const handleChange = (value: string, index: number): void => {
    if (!/^[0-9]$/.test(value) && value !== "") return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pasteData.length === 6) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputsRef.current[5]?.focus();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      alert("Please enter complete OTP");
      setLoading(false);
      return;
    }
    // console.log("OTP Submitted , user email :", finalOtp , userEmail.state.email);
    // console.log("otp : ",typeof(otp));
    const responce = await VerifyOTPApi({ email: userEmail.state.email, otp: finalOtp })
    if (responce.success) {
      setLoading(false);
      setResStatus({ success: true, message: responce.message })
      Swal.fire({
        title: "OTP verified successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      navigator("/login")
    } else {
      setLoading(false);
      setResStatus({ success: false, message: responce.message || "OTP verification failed" })
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">Enter the 6-digit code</p>
        <div className="grid grid-flow-row mb-3 space-y-2">
          <div className="flex justify-between" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => { inputsRef.current[index] = el }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <p className={`text-lg font-medium ${resStatus.success ? "text-green-500" : "text-red-500"}`}>
            {resStatus.message}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className={`w-full bg-blue-500 ${isLoading ? "text-gray-200 hover:bg-blue-300" : "text-white hover:bg-blue-600"}  py-2 rounded-lg  transition`}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );

}