import { getProducts } from "../services/productServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts({ page, limit }),
  });
};
