import { Button } from '@/app/ui/components/button';
import { Separator } from '@/app/ui/components/separator';
import { TextField } from '@/app/ui/components/text-field';
import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="flex w-[500px] flex-col gap-8 p-8">
                <h2 className="text-black-3 typography-M24">Login</h2>

                <div className="flex flex-col gap-6">
                    <div>
                        <label className="text-gray-6 mb-2 inline-block typography-R14" htmlFor="email">
                            Email
                        </label>
                        <TextField placeholder="example@test.com" type="email" id="email" />
                    </div>
                    <div>
                        <label className="text-gray-6 mb-2 inline-block typography-R14" htmlFor="password">
                            Password
                        </label>
                        <TextField placeholder='Enter password' type="password" id="password" />
                    </div>
                    <Link className="text-black-3 self-end typography-M14" href={'#'}>
                        Forgot Password?
                    </Link>
                </div>

                <Button>Login</Button>

                <Separator className="bg-gray-2" />

                <p className="text-gray-6 typography-R14">
                    Don’t have an account?{' '}
                    <Link className="text-black-3 typography-M14" href="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
