export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="px-6 py-16">
      <h1 className="text-3xl font-serif">Product: {slug}</h1>
    </div>
  );
}
