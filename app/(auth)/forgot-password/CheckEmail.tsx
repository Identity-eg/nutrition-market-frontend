import { useForgotPassword } from "@/apis/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MailPlusIcon } from "lucide-react";

export default function CheckEmail({ email }: { email: string }) {
  const forgotPasswordMutation = useForgotPassword();
  const onResend = async () => {
    forgotPasswordMutation.mutate({ email });
  }
  return <section className="flex flex-col items-center gap-y-4">
    <div className="flex items-center justify-center rounded-full h-32 w-32 bg-gray-30">
      <MailPlusIcon strokeWidth={1} size={70} className="text-green-500" />
    </div>
    <div className="flex flex-col items-center"><h1 className="capitalize typography-B20">check your email</h1>
      <p className="typography-L14 text-gray-90">we send a password reset link to</p><p className="typography-R14 text-gray-90">{email}</p></div>
    <p className="typography-R14 text-red-500 bg-gray-20 p-2">this link expires in 10 min</p>
    <div>
      <Separator />
      <p className="typography-R14">Didn't recieve email?
        <Button className="underline px-0 underline-offset-1 text-green-500" variant="link" onClick={onResend}>
          Click to resend
        </Button>
      </p>
    </div>
  </section>;
}
