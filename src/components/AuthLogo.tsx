import Image from "next/image";
import logoImg from "@/public/logo_fire.gif";

export function AuthLogo() {
  return (
    <Image
      src={logoImg}
      alt="Blog Logo Fire ver."
      className="w-56 mx-auto"
      unoptimized={true}
    />
  );
}
