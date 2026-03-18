import { useState, useRef, type ChangeEvent, type KeyboardEvent,type  ClipboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { VerifyOTPApi } from "../../services/NwConfig";

export default function VerifyOTP(){

   const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

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
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }
    console.log("OTP Submitted , user email :", finalOtp , userEmail.state.email);

    const responce= await VerifyOTPApi({email : userEmail.state.email, otp: finalOtp})
    if(responce.success){
        alert(responce.message)
    } else {
        alert(responce.message || "OTP verification failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center">
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">Enter the 6-digit code</p>

        <div className="flex justify-between mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => {inputsRef.current[index] = el}}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );

}