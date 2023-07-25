import { ColumnRef, OrderByDirection } from "objection";

export type IQueryObjectItem = "up" | "down" | "disabled";

export type IQueryObject = {
	[string: string]: IQueryObjectItem;
};

export type IOrderByCfg = {
	column: ColumnRef;
	order: OrderByDirection;
};
