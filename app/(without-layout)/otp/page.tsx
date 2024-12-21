import EmailVerificationIcon from 'assets/icons/email-verification-icon';
import { TSearchParams } from 'types/searchparams';
import { InputContainer } from './input-container';
import { getUserForOtp } from 'features/auth/apis/auth';

export default async function OtpPage({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	const user = await getUserForOtp({ id: searchParams.usid });

	return (
		<div className='flex h-screen flex-col items-center py-[120px]'>
			<div className='mb-8 flex flex-col items-center justify-center'>
				<EmailVerificationIcon />
				<h3 className='mt-10 text-center typography-SB24'>
					Verifiy your email address
				</h3>
				<span className='text-center text-gray-200 typography-R16'>
					Please enter 4-digit code we sent to{' '}
					<span className='typography-SB16'>{user.email}</span>
				</span>
			</div>
			<InputContainer />
		</div>
	);
}
