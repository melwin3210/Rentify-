import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: "Admin Alice", email: "admin1@rentify.com", password: "admin123", role: "admin", phone: "1234567800", verified: true },
  { id: 4, name: "Owner Diana", email: "owner4@rentify.com", password: "owner123", role: "owner", phone: "1234567803", verified: true },
  { id: 8, name: "Tenant Hannah", email: "tenant8@rentify.com", password: "tenant123", role: "tenant", phone: "1234567807", verified: true },
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Return only safe user data (no password)
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      verified: user.verified
    };
    
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}