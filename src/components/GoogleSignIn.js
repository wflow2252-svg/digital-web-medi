'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleSignIn({ clientId }) {
    const router = useRouter();
    const [libLoaded, setLibLoaded] = useState(false);
    const renderRef = useRef(null);

    const handleGoogleLogin = async (response) => {
        try {
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.credential }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('dropgenius_user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                console.error("Auth failed");
            }
        } catch (err) {
            console.error("Error during auth:", err);
        }
    };

    useEffect(() => {
        // Polling for google object
        const interval = setInterval(() => {
            if (typeof window !== 'undefined' && window.google) {
                setLibLoaded(true);
                clearInterval(interval);
                
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
        }, 500);

        return () => clearInterval(interval);
    }, [clientId]);

    return (
        <div className="flex flex-col items-center gap-4">
            {/* The standard Google button container */}
            <div id="google-signin-btn" className="flex justify-center transition-transform hover:scale-105 min-h-[50px]">
                {!libLoaded && (
                    <div className="animate-pulse bg-white/5 border border-white/10 w-[280px] h-[50px] rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-text-muted">جاري تجهيز بوابة جوجل الحاصة بك...</span>
                    </div>
                )}
            </div>
            
            {/* Fallback Manual Trigger - only visible if lib takes too long */}
            {!libLoaded && (
                <p className="text-[10px] text-text-muted opacity-50 px-8 text-center max-w-xs">
                    إذا لم يظهر الزر، تأكد من أنك قمت بإضافة رابط Vercel لرابط الـ Authorized Origins في Google Console.
                </p>
            )}
        </div>
    );
}
