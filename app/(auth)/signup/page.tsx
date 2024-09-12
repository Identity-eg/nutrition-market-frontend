import { Suspense } from 'react';
import CardAuthWrapper from '../card-auth-wrapper';
import { SignupForm } from './signup-form';

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
