import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json()
  const client = await clientPromise;
  const db = client.db("kisanconnect")
  const collection = db.collection("sellers")


  const result = await collection.insertOne(body)
  return Response.json({success:true, message: 'added', result:result, error: false})
}
