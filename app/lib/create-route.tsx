import {
    defineRoute,
    Params,
    MetaDescriptor,
    LinkDescriptor,
    AppLoadContext,
    UIMatch,
    MetaMatch as _MetaMatch,
} from "react-router"
import { ReactNode } from "react"
import { z } from "zod"
import { parseWithZod } from "@conform-to/zod"

type MaybePromise<T> = T | Promise<T>
type Pretty<T> = {
    [K in keyof T]: T[K]
} & {}
type Serializable =
    | undefined
    | null
    | boolean
    | string
    | symbol
    | number
    | Array<Serializable>
    | {
          [key: PropertyKey]: Serializable
      }
    | bigint
    | Date
    | URL
    | RegExp
    | Error
    | Map<Serializable, Serializable>
    | Set<Serializable>
    | Promise<Serializable>
type Data = MaybePromise<Exclude<Serializable, undefined | Promise<Serializable>>>
export type ResponseStub = {
    status: number | undefined
    headers: Headers
}
type LoaderArgs<Param extends string> = {
    context: AppLoadContext
    request: Request
    params: Params<Param>
    response: ResponseStub
}
type ActionArgs<Param extends string> = {
    context: AppLoadContext
    request: Request
    params: Params<Param>
    response: ResponseStub
}
type IsDefined<T> = Equal<T, undefined> extends true ? false : true
type _LoaderData<
    ServerLoaderData,
    ClientLoaderData,
    ClientLoaderHydrate extends boolean,
    HydrateFallback,
> = Awaited<
    [undefined extends HydrateFallback ? false : true, ClientLoaderHydrate] extends [true, true]
        ? IsDefined<ClientLoaderData> extends true
            ? ClientLoaderData
            : undefined
        : [IsDefined<ClientLoaderData>, IsDefined<ServerLoaderData>] extends [true, true]
          ? ServerLoaderData | ClientLoaderData
          : IsDefined<ClientLoaderData> extends true
            ? ClientLoaderHydrate extends true
                ? ClientLoaderData
                : ClientLoaderData | undefined
            : IsDefined<ServerLoaderData> extends true
              ? ServerLoaderData
              : undefined
>
type LoaderData<
    ServerLoaderData,
    ClientLoaderData,
    ClientLoaderHydrate extends boolean,
    HydrateFallback,
> = _LoaderData<
    Awaited<ServerLoaderData>,
    Awaited<ClientLoaderData>,
    ClientLoaderHydrate,
    HydrateFallback
>
type ActionData<ServerActionData, ClientActionData> = Awaited<
    [IsDefined<ServerActionData>, IsDefined<ClientActionData>] extends [true, true]
        ? ServerActionData | ClientActionData
        : IsDefined<ClientActionData> extends true
          ? ClientActionData
          : IsDefined<ServerActionData> extends true
            ? ServerActionData
            : undefined
>
type HydrateFallbackComponent<Param extends string> = (args: { params: Params<Param> }) => ReactNode
type Route<
    Param extends string,
    ClientLoaderHydrate extends boolean,
    HydrateFallback extends HydrateFallbackComponent<Param> | undefined,
    ServerLoaderData extends Data | undefined,
    ClientLoaderData,
    ServerActionData extends Data | undefined,
    ClientActionData,
> = {
    params?: Param[]
    links?: (args: { params: Params<Param> }) => LinkDescriptor[]
    HydrateFallback?: HydrateFallback
    serverLoader?: (args: LoaderArgs<Param>) => ServerLoaderData
    clientLoader?: (
        args: LoaderArgs<Param> & {
            serverLoader: IsDefined<ServerLoaderData> extends true
                ? () => Promise<Awaited<ServerLoaderData>>
                : undefined
        },
    ) => ClientLoaderData
    clientLoaderHydrate?: ClientLoaderHydrate
    serverAction?: (args: ActionArgs<Param>) => ServerActionData
    clientAction?: (
        args: ActionArgs<Param> & {
            serverAction: IsDefined<ServerActionData> extends true
                ? () => Promise<Awaited<ServerActionData>>
                : undefined
        },
    ) => ClientActionData
    meta?: (args: {
        params: Params<Param>
        location: Location
        error: unknown
        loaderData?: LoaderData<
            ServerLoaderData,
            ClientLoaderData,
            ClientLoaderHydrate,
            HydrateFallback
        >
        matches?: Array<_MetaMatch>
    }) => MetaDescriptor[]
    Component?: (args: {
        params: Params<Param>
        loaderData: LoaderData<
            ServerLoaderData,
            ClientLoaderData,
            ClientLoaderHydrate,
            HydrateFallback
        >
        actionData?: ActionData<ServerActionData, ClientActionData>
    }) => ReactNode
    ErrorBoundary?: (args: {
        params: Params<Param>
        error: unknown
        loaderData?: LoaderData<
            ServerLoaderData,
            ClientLoaderData,
            ClientLoaderHydrate,
            HydrateFallback
        >
        actionData?: ActionData<ServerActionData, ClientActionData>
    }) => ReactNode
    handle?: unknown
}
type ValidatedRoute<
    Param extends string,
    ClientLoaderHydrate extends boolean,
    HydrateFallback extends HydrateFallbackComponent<Param> | undefined,
    ServerLoaderData extends Data | undefined,
    ClientLoaderData,
    ServerActionData extends Data | undefined,
    ClientActionData,
> = {
    params?: Param[]
    links?: (args: { params: Params<Param> }) => LinkDescriptor[]
    HydrateFallback?: HydrateFallback
    serverLoader?: (args: LoaderArgs<Param>) => ServerLoaderData
    clientLoader?: (
        args: LoaderArgs<Param> & {
            serverLoader: IsDefined<ServerLoaderData> extends true
                ? () => Promise<Awaited<ServerLoaderData>>
                : undefined
        },
    ) => ClientLoaderData
    clientLoaderHydrate?: ClientLoaderHydrate
    serverAction?: (args: ActionArgs<Param>) => ServerActionData
    clientAction?: (
        args: ActionArgs<Param> & {
            serverAction: IsDefined<ServerActionData> extends true
                ? () => Promise<Awaited<ServerActionData>>
                : undefined
        },
    ) => ClientActionData
    meta?: (args: {
        params: Params<Param>
        location: Location
        error: unknown
        loaderData?: LoaderData<
            ServerLoaderData,
            ClientLoaderData,
            ClientLoaderHydrate,
            HydrateFallback
        >
        matches?: Array<_MetaMatch>
    }) => MetaDescriptor[]
    Component?: (args: {
        params: Params<Param>
        loaderData: LoaderData<
            ServerLoaderData,
            ClientLoaderData,
            ClientLoaderHydrate,
            HydrateFallback
        >
        actionData?: ActionData<ServerActionData, ClientActionData>
    }) => ReactNode
    ErrorBoundary?: (args: {
        params: Params<Param>
        error: unknown
        loaderData?: LoaderData<
            ServerLoaderData,
            ClientLoaderData,
            ClientLoaderHydrate,
            HydrateFallback
        >
        actionData?: ActionData<ServerActionData, ClientActionData>
    }) => ReactNode
    handle?: unknown
}
type LoaderDataFromRoute<R> =
    R extends Route<
        any,
        infer ClientLoaderHydrate,
        infer HydrateFallback,
        infer ServerLoaderData,
        infer ClientLoaderData,
        any,
        any
    >
        ? LoaderData<ServerLoaderData, ClientLoaderData, ClientLoaderHydrate, HydrateFallback>
        : never
export type MetaMatch<R extends Route<any, any, any, any, any, any, any>> = _MetaMatch<
    string,
    LoaderDataFromRoute<R>
>
export type Match<R extends Route<any, any, any, any, any, any, any>> = Pretty<
    UIMatch<LoaderDataFromRoute<R>>
>
type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export function createRoute<
    T,
    const Param extends string,
    ClientLoaderHydrate extends boolean,
    HydrateFallback extends HydrateFallbackComponent<Param> | undefined,
    ServerLoaderData extends Data | undefined = undefined,
    ClientLoaderData = undefined,
    ServerActionData extends Data | undefined = undefined,
    ClientActionData = undefined,
>(
    route: T &
        Route<
            Param,
            ClientLoaderHydrate,
            HydrateFallback,
            ServerLoaderData,
            ClientLoaderData,
            ServerActionData,
            ClientActionData
        >,
): T
export function createRoute<
    T,
    const Param extends string,
    ClientLoaderHydrate extends boolean,
    HydrateFallback extends HydrateFallbackComponent<Param> | undefined,
    ServerLoaderData extends Data | undefined = undefined,
    ClientLoaderData = undefined,
    ServerActionData extends Data | undefined = undefined,
    ClientActionData = undefined,
>(
    route: T &
        Route<
            Param,
            ClientLoaderHydrate,
            HydrateFallback,
            ServerLoaderData,
            ClientLoaderData,
            ServerActionData,
            ClientActionData
        > & {
            Layout: (args: {
                params: Params<Param>
                error: unknown
                loaderData?: LoaderData<
                    ServerLoaderData,
                    ClientLoaderData,
                    ClientLoaderHydrate,
                    HydrateFallback
                >
                actionData?: ActionData<ServerActionData, ClientActionData>
            }) => ReactNode
        },
): T
export function createRoute<
    T,
    const Param extends string,
    ClientLoaderHydrate extends boolean,
    HydrateFallback extends HydrateFallbackComponent<Param> | undefined,
    ServerLoaderData extends Data | undefined = undefined,
    ClientLoaderData = undefined,
    ServerActionData extends Data | undefined = undefined,
    ClientActionData = undefined,
    ServerActionURLSearchParamsSchema extends Record<string, z.ZodType> | any = any,
    ServerActionBodySchema extends z.ZodType | {} = {},
>({
    params,
    links,
    HydrateFallback,
    serverLoader,
    clientLoader,
    clientLoaderHydrate,
    serverAction,
    clientAction,
    meta,
    Component,
    ErrorBoundary,
    handle,
    ...rest
}: T &
    ValidatedRoute<
        Param,
        ClientLoaderHydrate,
        HydrateFallback,
        ServerLoaderData,
        ClientLoaderData,
        ServerActionData,
        ClientActionData
    >): T &
    Route<
        Param,
        ClientLoaderHydrate,
        HydrateFallback,
        ServerLoaderData,
        ClientLoaderData,
        ServerActionData,
        ClientActionData
    > {
    let extras = rest as T

    function validateAction(action?: {
        searchParams: { schema: ServerActionURLSearchParamsSchema }
        body: {
            accept: "blob" | "bytes" | "arrayBuffer" | "text" | "json" | "formData"
            schema?: ServerActionBodySchema
        }
        handler(
            handlerInit: HandlerInit<
                Param,
                ServerActionURLSearchParamsSchema,
                ServerActionBodySchema
            >,
        ): Promise<Response>
    }): (context: ActionArgs<Param>) => ServerActionData {
        return action
            ? async (context: ActionArgs<Param>) => {
                  let formData = await context.request.formData()

                  // TODO: Catch input parsing error and hand off to the client
                  let parsedBody = parseWithZod(formData, {
                      schema: action.body.schema as z.ZodType,
                  })

                  let searchParams = new URL(context.request.url).searchParams
                  let parsedSearchParams = parseWithZod(searchParams, {
                      schema: z.object(action.searchParams.schema as Record<string, z.ZodType>),
                  })

                  return await action.handler({
                      request: context.request,
                      urlParams: context.params,
                      searchParams: parsedSearchParams.payload as any,
                      body: parsedBody.payload as any,
                  })
              }
            : undefined
    }

    return {
        params,
        links,
        HydrateFallback,
        serverLoader,
        clientLoader,
        clientLoaderHydrate,
        serverAction: validateAction(serverAction),
        clientAction,
        meta,
        Component,
        ErrorBoundary,
        handle,
        ...extras,
    }
}

export type HandlerInit<
    Param extends string,
    // FIXME: Why does this work with `| any = any` but not `| never = never`?
    URLSearchParamsSchema extends Record<string, z.ZodType> | any = any,
    // FIXME: Why does this work with `| {} = {}` but not `| any = any` or `| never = never`?
    //deno-lint-ignore ban-types
    BodySchema extends z.ZodType | {} = {},
> = {
    request: Request
    urlParams: Params<Param>
    searchParams: URLSearchParamsSchema extends z.ZodType
        ? z.infer<z.ZodObject<URLSearchParamsSchema>>
        : URLSearchParams
    body: BodySchema extends z.ZodType ? z.infer<BodySchema> : Uint8Array
}
