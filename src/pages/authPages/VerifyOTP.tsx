import { useState, useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResendOTPApi, VerifyOTPApi } from "../../services/NwConfig";
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

  const reSendOtp = async (): Promise<string> =>{
    const email = userEmail.state.email;
    if(!email){
      setResStatus({ success: false, message: "Email not found" })
      return "Email not found";
    }
    // Call resend OTP API here with the email
    const responce = await ResendOTPApi({ email })
    if(responce.success){
      setResStatus({ success: true, message: responce.message })
      Swal.fire({
        title: "OTP resent successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      return responce.message;
    } else {
      setResStatus({ success: false, message: responce.message || "Failed to resend OTP" })
      return responce.message || "Failed to resend OTP";
    }
  }

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
    <div className="min-h-screen flex items-center justify-center bg-[#06070A]">
  <div className="w-full max-w-sm px-4">

    {/* Header */}
    <div className="mb-8">
      <p className="font-mono text-sm tracking-[0.2em] uppercase text-[#454C5E] mb-2">
        — Verification
      </p>
      <h2 className="font-display text-6xl tracking-wide text-[#F0F2F5] leading-none">
        VERIFY OTP
      </h2>
      <p className="font-mono text-[0.68rem] text-[#454C5E]  leading-relaxed">
        Enter the 6-digit code sent to your email.
      </p>
    </div>

    {/* OTP Inputs */}
    <div className="mb-3">
      <div
        className="flex justify-between gap-2"
        onPaste={handlePaste}
      >
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
            className={`
              w-12 h-14 text-center bg-transparent
              border-b-2 border-[#1E2330]
              font-display text-2xl text-[#F0F2F5]
              outline-none transition-all duration-200
              focus:border-[#B8F5D4]
              ${digit ? 'border-[rgba(184,245,212,0.4)] text-[#B8F5D4]' : ''}
            `}
          />
        ))}
      </div>

      {/* Status message */}
      {resStatus.message && (
        <p className={`
          mt-4 font-mono text-[0.6rem] tracking-widest uppercase
          ${resStatus.success ? 'text-[#B8F5D4]' : 'text-[#FFD4B8]'}
        `}>
          {resStatus.success ? '✓ ' : '✕ '}{resStatus.message}
        </p>
      )}
    </div>

    {/* Submit */}
    <button
      onClick={handleSubmit}
      className={`
        w-full mt-8 font-mono text-sm tracking-widest uppercase
        rounded-sm px-8 py-4 flex items-center justify-center
        transition-all duration-200
        ${isLoading
          ? 'border border-[#B8F5D4] text-[#B8F5D4] bg-[#B8F5D4]/10 cursor-not-allowed'
          : 'bg-[#B8F5D4] text-[#06070A] hover:bg-[#A5E5C1] hover:-translate-y-px'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 border border-[#B8F5D4] border-t-transparent rounded-full animate-spin" />
          Verifying...
        </span>
      ) : (
        'Verify OTP →'
      )}
    </button>

    {/* Footer */}
    <div className="mt-8 pt-6 border-t border-[#1E2330] font-mono text-sm tracking-widest uppercase text-[#3e4352] text-center">
      Didn't receive a code?{' '}
      <span 
      onClick={()=> reSendOtp()}
      className="text-[#B8F5D4] cursor-pointer hover:underline">
        Resend →
      </span>
    </div>

  </div>
</div>
  );

}