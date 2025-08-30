'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useKeycloakInstance } from "@/hooks/KeycloackIstance";
import { useAuth } from "@/hooks/keycloackAuth";
import { useUserData } from "@/hooks/keycloackUserData";
import { useKeycloakActions } from "@/hooks/keycloakActions";

export default function UserProfile() {
    const kc = useKeycloakInstance();
    const authenticated = useAuth(kc);
    const userData = useUserData(kc, authenticated);
    const { login, logout } = useKeycloakActions(kc);

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Hero */}
            <section className="mx-auto max-w-4xl px-6 pt-14">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            <span className="underline decoration-gray-300">{userData.fullName || "Utente"}</span>'s Profile
                        </h1>
                        <p className="mt-3 text-gray-600">
                            View all the information related to your account here.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <Link
                                href="/reunion/home"
                                className="rounded-2xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
                            >
                                Back to Home
                            </Link>
                            {!authenticated ? (
                                <button
                                    onClick={login}
                                    className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    onClick={logout}
                                    className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="md:block flex justify-center">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                            <Image
                                src=""
                                alt="User Avatar"
                                width={150}
                                height={150}
                                className="mx-auto rounded-full"
                            />
                            <p className="mt-4 text-sm text-gray-500">
                                ID Utente: <span className="text-gray-900">{userData.userId || "None Assigned."}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Info */}
            <section className="mx-auto max-w-4xl px-6 py-10 mt-10 bg-white rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">User Data</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Username:</span>
                        <span className="text-gray-900">{userData.username}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Email:</span>
                        <span className="text-gray-900">{userData.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Full Name:</span>
                        <span className="text-gray-900">{userData.fullName}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Roles:</span>
                        {userData && userData.roles.length > 0 ? (
                            <ul className="text-gray-900 list-disc list-inside">
                                {userData.roles.map((role) => (
                                    <li key={role}>
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="text-gray-900">None Assigned.</span>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
