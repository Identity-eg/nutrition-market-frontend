import { Suspense } from 'react';
import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import { LoginForm } from 'app/(auth)/login/login-form';

// export const dynamic = 'force-static';

export default function LoginPage() {
	return (
		<CardAuthWrapper
			description='Enter your email below to login to your account'
			title='Login'
		>
			<Suspense fallback='Loading...'>
				<LoginForm />
			</Suspense>
		</CardAuthWrapper>
	);
}
