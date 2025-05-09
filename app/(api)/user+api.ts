import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL!}`);
    const { name, email, clerkId, role } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        // eslint-disable-next-line prettier/prettier
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO users (
      name, 
      email, 
      clerk_id,
      purpose
      )
    VALUES (
      ${name}, 
      ${email}, 
      ${clerkId},
      ${role}
      );
  `;
    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error("Error inserting user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL!}`);
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return Response.json(
        { error: "Missing email parameter" },
        { status: 400 }
      );
    }

    const role = await sql`
      SELECT purpose as role
      FROM users
      WHERE email = ${email}
      LIMIT 1;
    `;

    if (role.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ data: role[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
