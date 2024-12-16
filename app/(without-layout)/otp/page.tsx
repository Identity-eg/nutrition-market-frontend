import EmailVerificationIcon from 'assets/icons/email-verification-icon';
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'components/ui/input-otp';
import { TSearchParams } from 'types/searchparams';

export default function OtpPage({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	return (
		<div className='flex h-screen flex-col items-center py-[120px]'>
			<div className='mb-8 flex flex-col items-center justify-center'>
				<EmailVerificationIcon />
				<h3 className='mt-10 text-center typography-SB24'>
					Verifiy your email address
				</h3>
				<span className='text-center text-gray-200 typography-R16'>
					Please enter 4-digit code we sent to{' '}
					<span className='typography-SB16'>{searchParams.email}</span>
				</span>
			</div>
			<InputOTP maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	);
}
