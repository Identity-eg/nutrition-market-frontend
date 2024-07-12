import {
	privateRoutesMiddleware,
	refreshToken,
	unAuthenticatedRoutesMiddleware,
} from 'middlewares/auth';
import { chain } from 'middlewares/chain';

const middlewares = [
	refreshToken,
	privateRoutesMiddleware,
	unAuthenticatedRoutesMiddleware,
];

export default chain(middlewares);

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
