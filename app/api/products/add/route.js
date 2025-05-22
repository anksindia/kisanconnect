import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      phone,
      name,
      description,
      price,
      category,
      origin,
      harvestedOn,
      shelfLife,
      storageTip,
      usage,
      healthBenefits,
      stock,
      imageUrl
    } = data;

    if (!phone) {
      return new Response(JSON.stringify({ success: false, message: 'Phone number is required' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // Default DB from URI
    const sellers = db.collection('sellers');

    const updateResult = await sellers.updateOne(
      { phone },
      {
        $push: {
          products: {
            name,
            description,
            price: Number(price),
            category,
            origin,
            harvestedOn,
            shelfLife,
            storageTip,
            usage,
            healthBenefits,
            stock: Number(stock),
            imageUrl,
            createdAt: new Date()
          }
        }
      }
    );

    if (updateResult.modifiedCount === 1) {
      return new Response(JSON.stringify({ success: true, message: 'Product added successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Seller not found or no changes made' }), { status: 404 });
    }

  } catch (error) {
    console.error('Error adding product:', error);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500 });
  }
}
