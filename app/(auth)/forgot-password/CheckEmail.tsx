import { useForgotPassword } from 'apis/auth';
import EmailSentSuccessfully from 'assets/icons/email-sent-successfully';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';

export default function CheckEmail({ email }: { email: string }) {
	const forgotPasswordMutation = useForgotPassword();
	const onResend = async () => {
		forgotPasswordMutation.mutate({ email });
	};
	return (
		<section className='flex flex-col items-center gap-y-4'>
			<EmailSentSuccessfully />
			<div className='mt-6 flex flex-col items-center'>
				<h1 className='capitalize typography-B20'>check your email</h1>
				<p className='text-gray-90 typography-L14'>
					we send a password reset link to
				</p>
				<p className='text-gray-90 typography-R14'>{email}</p>
			</div>
			<p className='bg-gray-20 p-2 text-red-500 typography-R14'>
				this link expires in 10 min
			</p>
			<div>
				<Separator />
				<p className='typography-R14'>
					Didn&apos;t recieve email?
					<Button
						className='px-0 text-green-500 underline underline-offset-1'
						variant='link'
						onClick={onResend}>
						Click to resend
					</Button>
				</p>
			</div>
		</section>
	);
}
