import type { IData } from "../../types/products";

interface IProduct {
  products: IData[];
}

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function ProductsTable({ products }: IProduct) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 table-fixed text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-[15%] px-5 py-3 font-semibold">Sku</th>
              <th className="w-[30%] px-5 py-3 font-semibold">Producto</th>
              <th className="w-[23%] px-5 py-3 text-right font-semibold">
                Precio
              </th>
              <th className="w-[16%] px-5 py-3 text-center font-semibold">
                Stock
              </th>
              <th className="w-[16%] px-5 py-3 text-center font-semibold">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((data) => (
              <tr key={data.id}>
                <td className="truncate px-5 py-4 font-mono text-xs text-slate-600">
                  {data.sku}
                </td>
                <td className="px-5 py-4">
                  <div className="text-slate-900 font-medium">
                    {data.nombre}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {data.descripcion || "Sin descripción"}
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-medium">
                  {currencyFormatter.format(data.precio)}
                </td>
                <td className="px-5 py-4 text-center">
                  <span
                    className={
                      data.stock <= data.stockMinimo
                        ? "font-semibold text-red-400"
                        : "text-slate-700"
                    }
                  >
                    {data.stock}
                  </span>
                  <div className="mt-1 text-xs text-slate-500">
                    Mínimo: {data.stockMinimo}
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span
                    className={
                      data.activo
                        ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                        : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    }
                  >
                    {data.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-slate-500"
                >
                  No hay productos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
