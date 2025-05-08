import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("kisanconnect");
  const collection = db.collection("sellers");

  // Ensure phone is stored as string
  body.phone = String(body.phone);

  // Check if phone number already exists
  const existingUser = await collection.findOne({ phone: body.phone });

  if (existingUser) {
    return Response.json({
      success: false,
      message: "Phone number already registered",
      error: true,
    }, { status: 409 }); // 409 = Conflict
  }

  const result = await collection.insertOne(body);

  return Response.json({
    success: true,
    message: 'User registered successfully',
    result: result,
    error: false
  });
}
