import { IQueryObject, IOrderByCfg } from "@/types";

export default (query: IQueryObject): IOrderByCfg[] => {
	const result = [];
	for (const [key, value] of Object.entries(query)) {
		if (value !== "disabled") {
			result.push({
				column: key,
				order: value === "up" ? "asc" : "desc",
			});
		}
	}
	return result as IOrderByCfg[];
};
