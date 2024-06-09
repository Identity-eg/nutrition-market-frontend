import { Button } from '@/app/ui/components/button';
import { Separator } from '@/app/ui/components/separator';
import { TextField } from '@/app/ui/components/text-field';
import Link from 'next/link';
import React from 'react';

export default function SignupPage() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <div className="flex w-[500px] flex-col gap-8 p-8">
                <h2 className="text-black-3 typography-M24">Create an Account</h2>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                        <div>
                            <label className="text-gray-6 mb-2 inline-block typography-R14" htmlFor="firstName">
                                First name
                            </label>
                            <TextField placeholder="ex: sayed" id="firstName" />
                        </div>
                        <div>
                            <label className="text-gray-6 mb-2 inline-block typography-R14" htmlFor="lastName">
                                Last name
                            </label>
                            <TextField placeholder="ex: elgendy" id="lastName" />
                        </div>
                    </div>

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
                        <TextField placeholder="Enter password" type="password" id="password" />
                    </div>
                </div>

                <Button>Register</Button>

                <Separator className="bg-gray-2" />

                <p className="text-gray-6 typography-R14">
                    Already have an account?{' '}
                    <Link href="/login" className="text-black-3 typography-M14">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
