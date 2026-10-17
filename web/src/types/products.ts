export interface IProducts {
  data: IData[];
  pagination: IPagination;
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  hasNextPage: number;
  hasPreviousPage: number;
}
export interface IData {
  id: number;
  nombre: string;
  sku: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
