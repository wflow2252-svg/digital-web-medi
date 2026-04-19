import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request) {
    try {
        const { token } = await request.json();

        // Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        
        // In a real app, you would create/update a user in your database here
        // and create a secure session (e.g., using Iron Session or JWT)
        
        const user = {
            id: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        };

        return NextResponse.json({ 
            success: true, 
            user 
        });

    } catch (error) {
        console.error('Verify error:', error);
        return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
}
