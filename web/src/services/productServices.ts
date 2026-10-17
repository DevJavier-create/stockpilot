import { api } from "./api";
import type { IProducts } from "../types/products";
export interface GetIParams {
  page?: number;
  limit?: number;
}

export const getProducts = async (
  params: GetIParams = {},
): Promise<IProducts> => {
  const { data } = await api.get("/products", {
    params: {
      params,
    },
  });
  return data;
};
