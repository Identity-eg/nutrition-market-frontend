import { Suspense } from 'react';
import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import { SignupForm } from 'app/(auth)/signup/signup-form';

export default function SignupPage() {
	return (
		<CardAuthWrapper
			description='Enter your information to create an account'
			title='Create an account'>
			<Suspense fallback='Loading...'>
				<SignupForm />
			</Suspense>
		</CardAuthWrapper>
	);
}
