'use client';

import { InputOTP, InputOTPGroup, InputOTPSlot } from 'components/ui/input-otp';
import { verifyOtp } from 'features/auth/apis/auth';
import { useAction } from 'next-safe-action/hooks';

export function InputContainer() {
	const { execute, result } = useAction(verifyOtp);

	return (
		<>
			<InputOTP
				onChange={newValue => {
					if (newValue.length === 4) {
						execute({ otp: newValue });
					}
				}}
				maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
			{(result.serverError || result.validationErrors?._errors) && (
				<span className='text-red-500 typography-R14'>
					{result.serverError || result.validationErrors?._errors}
				</span>
			)}
		</>
	);
}
