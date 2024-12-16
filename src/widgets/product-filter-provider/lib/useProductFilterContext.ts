import {useContext} from "react";
import {ProductFilterContext} from "@widgets/product-filter-provider/ProductFilterProvider";

export const useProductFilterContext = () => useContext(ProductFilterContext);