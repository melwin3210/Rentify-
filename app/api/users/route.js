import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password123", role: "tenant", phone: "123-456-7890", verified: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password123", role: "owner", phone: "098-765-4321", verified: true },
  { id: 3, name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin", phone: "555-123-4567", verified: true }
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const newUser = { id: Date.now(), ...body, verified: false };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}