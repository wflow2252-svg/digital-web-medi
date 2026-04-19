'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleSignIn({ clientId }) {
    const router = useRouter();

    const handleGoogleLogin = async (response) => {
        try {
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.credential }),
            });

            if (res.ok) {
                const data = await res.json();
                // Save profile to local storage for quick UI access
                localStorage.setItem('dropgenius_user', JSON.stringify(data.user));
                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                console.error("Auth failed");
            }
        } catch (err) {
            console.error("Error during auth:", err);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.google) {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleLogin,
                auto_select: false,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("google-signin-btn"),
                { 
                    theme: "filled_blue", 
                    size: "large", 
                    text: "continue_with",
                    shape: "pill",
                    width: "280"
                }
            );
        }
    }, [clientId]);

    return (
        <div id="google-signin-btn" className="flex justify-center mt-8 transition-transform hover:scale-105"></div>
    );
}
