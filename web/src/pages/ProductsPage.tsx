import { Package } from "lucide-react";
import { useGetProducts } from "../hooks/use-get-products";
import ProductsTable from "../components/products/ProductsTable";
export function ProductsPage() {
  const { data, isError, isPending } = useGetProducts(1, 10);
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Productos</h2>

      <p className="mt-2 text-sm text-slate-500">
        Consulta y administra los productos de tu inventario.
      </p>
      <div className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
        <Package size={18} />
        Inventario
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Productos registrados</p>

          <p className="mt-2 text-3xl font-bold">
            {data ? data.pagination.total : "—"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Productos en esta página</p>

          <p className="mt-2 text-3xl font-bold">
            {data ? data.data.length : "—"}
          </p>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Listado de productos</h3>

        {isPending && (
          <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Cargando productos...
          </p>
        )}

        {isError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          >
            <p className="font-semibold">No pudimos cargar los productos.</p>
          </div>
        )}

        {!isPending && !isError && data && (
          <>
            <ProductsTable products={data.data} />

            <p className="mt-4 text-sm text-slate-500">
              Página {data.pagination.page} de {data.pagination.totalPage} ·{" "}
              {data.pagination.total} productos en total
            </p>
          </>
        )}
      </div>
    </section>
  );
}
