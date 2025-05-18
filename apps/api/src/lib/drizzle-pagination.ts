import { db } from "@/db";
import {
	type Column,
	type SQL,
	and,
	asc,
	desc,
	eq,
	gt,
	lt,
	or,
	sql,
} from "drizzle-orm";

/**
 * Options for pagination
 */
interface PaginationOptions {
	/** Number of records per page */
	limit: number;
	/** Array of column and sort direction pairs for ordering */
	orderBy: [Column, "asc" | "desc"][];
	/** Pagination type: either limit-offset or cursor based */
	type: "limit-offset" | "cursor";
	/** Offset for limit-offset pagination */
	offset?: number;
	/** Cursor values for cursor-based pagination */
	cursorValues?: any[];
}

/**
 * Result of a paginated query
 */
interface PaginatedResult<T> {
	/** Array of paginated data */
	data: T[];
	/** Cursor values for the next page (cursor pagination only) */
	nextCursor?: any[];
	/** Indicates if there are more records available */
	hasNextPage: boolean;
	/** Total number of records */
	total: number;
}

/**
 * Builds WHERE clause for cursor-based pagination
 * @param cursorColumns - Array of column and sort direction pairs
 * @param cursorValues - Array of cursor values
 * @returns SQL condition for cursor-based pagination
 */
function buildCursorWhere(
	cursorColumns: [Column, "asc" | "desc"][],
	cursorValues: any[],
): SQL {
	const conditions = cursorColumns.map(([col, dir], index) => {
		// 前面的相等条件
		const eqConditions = cursorColumns
			.slice(0, index)
			.map(([c], i) => eq(c, cursorValues[i]));
		// 当前列的比较条件，根据排序方向选择 > 或 <
		const compare = dir === "asc" ? gt : lt;
		const compareCondition = compare(col, cursorValues[index]);
		return and(...eqConditions, compareCondition);
	});
	const whereClause = or(...conditions);
	if (!whereClause) {
		throw new Error("No valid conditions for cursor pagination");
	}
	return whereClause;
}
export type PaginateWithLimitOffsetOptions = Omit<
	PaginationOptions,
	"type" | "cursorValues"
>;
/**
 * Performs limit-offset pagination on a Drizzle query
 *
 * @param query - Drizzle query builder
 * @param options - Pagination options
 * @returns Paginated result containing data and pagination metadata
 *
 * @example
 * // 第一页
 * const firstPage = await paginateWithLimitOffset(query, {
 *   limit: 10,
 *   orderBy: [[users.id, 'asc']],
 *   offset: 0
 * });
 *
 * // 获取下一页
 * const nextPage = await paginateWithLimitOffset(query, {
 *   limit: 10,
 *   orderBy: [[users.id, 'asc']],
 *   offset: firstPage.nextCursor?.[0] // 使用返回的 offset 值
 * });
 */
async function paginateWithLimitOffset<T>(
	query: any,
	options: PaginateWithLimitOffsetOptions,
): Promise<PaginatedResult<T>> {
	const { limit, orderBy, offset = 0 } = options;

	// 验证参数
	if (limit <= 0) {
		throw new Error("Limit must be greater than 0");
	}
	if (offset < 0) {
		throw new Error("Offset must be greater than or equal to 0");
	}

	const orderByExpressions = orderBy.map(([col, dir]) =>
		dir === "asc" ? asc(col) : desc(col),
	);

	// 获取总数
	const [{ count }] = await db
		.select({ count: sql<number>`count(*)` })
		.from(query);

	// 获取当前页的数据
	const modifiedQuery = query
		.orderBy(...orderByExpressions)
		.limit(limit + 1) // 多取一条用于判断是否有下一页
		.offset(offset);
	const result = await modifiedQuery;

	// 判断是否有下一页
	const hasNextPage = result.length > limit;
	const data = result.slice(0, limit);

	// 计算下一页的 offset
	const nextOffset = hasNextPage ? offset + limit : undefined;

	return {
		data,
		hasNextPage,
		nextCursor: nextOffset !== undefined ? [nextOffset] : undefined,
		total: count,
	};
}

export type PaginateWithCursorOptions = Omit<
	PaginationOptions,
	"type" | "offset"
>;
/**
 * Performs cursor-based pagination on a Drizzle query
 *
 * @param query - Drizzle query builder
 * @param options - Pagination options
 * @returns Paginated result containing data and pagination metadata
 *
 * @example
 * // 单列排序示例
 * const firstPage = await paginateWithCursor(query, {
 *   limit: 10,
 *   orderBy: [[users.id, 'asc']]
 * });
 *
 * // 多列排序示例
 * const firstPage = await paginateWithCursor(query, {
 *   limit: 10,
 *   orderBy: [
 *     [users.createdAt, 'desc'],
 *     [users.id, 'asc']
 *   ]
 * });
 *
 * // 获取下一页
 * const nextPage = await paginateWithCursor(query, {
 *   limit: 10,
 *   orderBy: [
 *     [users.createdAt, 'desc'],
 *     [users.id, 'asc']
 *   ],
 *   cursorValues: firstPage.nextCursor // 包含所有排序列的值
 * });
 */
async function paginateWithCursor<T>(
	query: any,
	options: PaginateWithCursorOptions,
): Promise<PaginatedResult<T>> {
	const { limit, orderBy, cursorValues } = options;
	const orderByExpressions = orderBy.map(([col, dir]) =>
		dir === "asc" ? asc(col) : desc(col),
	);

	// 获取总数
	const [{ count }] = await db
		.select({ count: sql<number>`count(*)` })
		.from(query);

	let modifiedQuery = query.orderBy(...orderByExpressions);
	if (cursorValues) {
		const whereClause = buildCursorWhere(orderBy, cursorValues);
		modifiedQuery = modifiedQuery.where(whereClause);
	}
	const result = await modifiedQuery.limit(limit + 1);
	const hasNextPage = result.length > limit;
	const data = result.slice(0, limit);
	let nextCursor: any[] | undefined;
	if (data.length > 0) {
		const lastRecord = data[data.length - 1];
		nextCursor = orderBy.map(([col]) => {
			const value = lastRecord[col.name as keyof typeof lastRecord];
			return value === undefined ? null : value;
		});
	}
	return { data, nextCursor, hasNextPage, total: count };
}

/**
 * Performs pagination on a Drizzle query
 *
 * @param query - Drizzle query builder
 * @param options - Pagination options
 * @returns Paginated result containing data and pagination metadata
 *
 * @example
 * // Cursor Pagination Example:
 * // First page: 10 records per page, ordered by id ascending
 * const firstPageOptions: PaginationOptions = {
 *   type: 'cursor',
 *   limit: 10,
 *   orderBy: [[users.id, 'asc']],
 * };
 * const firstPage = await paginate(db.select().from(users), firstPageOptions);
 *
 * // Next page using cursor from previous page
 * const nextPageOptions: PaginationOptions = {
 *   type: 'cursor',
 *   limit: 10,
 *   orderBy: [[users.id, 'asc']],
 *   cursorValues: firstPage.nextCursor,
 * };
 * const nextPage = await paginate(db.select().from(users), nextPageOptions);
 *
 * // Limit-Offset Pagination Example:
 * // First page
 * const page1Options: PaginationOptions = {
 *   type: 'limit-offset',
 *   limit: 10,
 *   orderBy: [[users.createdAt, 'desc']],
 *   offset: 0
 * };
 * const page1 = await paginate(db.select().from(users), page1Options);
 */
async function paginate<T>(
	query: any,
	options: PaginationOptions,
): Promise<PaginatedResult<T>> {
	if (options.type === "limit-offset") {
		return paginateWithLimitOffset(query, options);
	}
	return paginateWithCursor(query, options);
}

// 导出函数
export {
	paginate,
	paginateWithLimitOffset,
	paginateWithCursor,
	type PaginationOptions,
	type PaginatedResult,
};
