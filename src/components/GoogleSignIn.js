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
            {/* The standard Google button container with an isolated empty div for Google logic */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', minHeight: '50px', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div id="google-signin-btn" style={{ position: 'relative', zIndex: 10, minWidth: '280px', minHeight: '50px' }}></div>
                
                {!libLoaded && (
                    <div className="animate-pulse" style={{ 
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        width: '280px', height: '50px', borderRadius: '9999px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '10px', color: '#a0a0a0' }}>جاري تجهيز بوابة جوجل الحاصة بك...</span>
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
