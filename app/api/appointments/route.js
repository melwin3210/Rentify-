import { NextResponse } from 'next/server';

let appointments = [
  { id: 1, propertyId: 1, userId: 1, date: "2024-01-15", time: "10:00", status: "confirmed", notes: "First viewing" },
  { id: 2, propertyId: 2, userId: 1, date: "2024-01-20", time: "14:00", status: "pending", notes: "Interested in lease" }
];

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request) {
  const body = await request.json();
  const newAppointment = { id: Date.now(), ...body, status: "pending" };
  appointments.push(newAppointment);
  return NextResponse.json(newAppointment, { status: 201 });
}