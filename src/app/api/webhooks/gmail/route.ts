export async function POST(
  req: Request
) {
  const payload =
    await req.json();

  // save email placeholder
  /*
  await prisma.email.upsert({
    ...
  });
  */

  return Response.json({
    success: true,
  });
}