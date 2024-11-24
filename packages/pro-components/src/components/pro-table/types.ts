import type {
  ColumnDef as TanstackColumnDef,
  TableOptions,
} from "@tanstack/react-table"

import type { PaginationProps } from "../data-table/data-table-pagination"

/**
 * Configuration options for the search functionality
 * 搜索功能的配置选项
 * @interface SearchConfig
 */
export interface SearchConfig {
  /**
   * Placeholder text for the search input
   * 搜索输入框的占位文本
   */
  placeholder?: string
  /**
   * Custom render function for the search input
   * 自定义搜索输入框的渲染函数
   */
  render?: (props: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }) => React.ReactNode
}

/**
 * Search type can be either a boolean or a SearchConfig object
 * 搜索类型可以是布尔值或 SearchConfig 对象
 * @typedef {boolean | SearchConfig} SearchType
 */
export type SearchType = boolean | SearchConfig

/**
 * Common extensions for table columns
 * 表格列的通用扩展属性
 * @interface ColumnExtensions
 */
interface ColumnExtensions {
  /**
   * Enable column search functionality
   * 启用列搜索功能
   * @default false
   */
  search?: SearchType
  /**
   * Column width in pixels
   * 列宽度（像素）
   * @default auto
   */
  width?: number
}

/**
 * Extended column definition that combines TanStack's ColumnDef with custom properties
 * 扩展的列定义，结合了 TanStack 的 ColumnDef 和自定义属性
 * @template TData The type of data in the table / 表格数据的类型
 * @template TValue The type of value in the column / 列值的类型
 */
export type ColumnDef<TData, TValue = unknown> =
  | (TanstackColumnDef<TData, TValue> & ColumnExtensions & {
    /**
     * Optional pin position. When undefined, id is optional
     * 可选的固定位置。当未定义时，id 是可选的
     */
    pinned?: undefined
  })
  | (TanstackColumnDef<TData, TValue> & ColumnExtensions & {
    /**
     * Pin position of the column. When set, id is required
     * 列的固定位置。设置时，id 是必需的
     */
    pinned: "left" | "right"
    /**
     * Required column identifier when pinned is set
     * 当设置 pinned 时，必需的列标识符
     */
    id: string
  })

/**
 * Search parameters type
 * 搜索参数类型
 * @typedef {Record<string, string>} SearchParams
 */
export type SearchParams = Record<string, string>

/**
 * Props for the ProTable component
 * ProTable 组件的属性
 * @interface ProTableProps
 * @template TData The type of data in the table / 表格数据的类型
 * @template TValue The type of value in the columns / 列值的类型
 */
export interface ProTableProps<TData, TValue> {
  /**
   * Array of column definitions
   * 列定义数组
   */
  columns: ColumnDef<TData, TValue>[]
  /**
   * Array of data items to display in the table
   * 要在表格中显示的数据项数组
   */
  data: TData[]
  /**
   * Loading state of the table
   * 表格的加载状态
   */
  isLoading: boolean
  /**
   * Optional toolbar component to render above the table
   * 可选的工具栏组件，渲染在表格上方
   */
  toolbar?: React.ReactNode
  /**
   * Pagination configuration and callbacks
   * 分页配置和回调
   */
  pagination?: PaginationProps
  /**
   * Initial state configuration for the table
   * 表格的初始状态配置
   */
  initialState?: TableOptions<TData>["initialState"]
  /**
   * Callback function to refresh table data
   * 刷新表格数据的回调函数
   */
  onRefresh?: () => void
  /**
   * Callback function when search is performed
   * 执行搜索时的回调函数
   */
  onSearch?: (params: SearchParams) => void
  enableSearch?: boolean
}
