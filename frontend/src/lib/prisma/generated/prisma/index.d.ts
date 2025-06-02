/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model PromptTemplate
 *
 */
export type PromptTemplate =
  $Result.DefaultSelection<Prisma.$PromptTemplatePayload>;
/**
 * Model PromptInput
 *
 */
export type PromptInput = $Result.DefaultSelection<Prisma.$PromptInputPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PromptTemplates
 * const promptTemplates = await prisma.promptTemplate.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PromptTemplates
   * const promptTemplates = await prisma.promptTemplate.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent
    ) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.promptTemplate`: Exposes CRUD operations for the **PromptTemplate** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PromptTemplates
   * const promptTemplates = await prisma.promptTemplate.findMany()
   * ```
   */
  get promptTemplate(): Prisma.PromptTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.promptInput`: Exposes CRUD operations for the **PromptInput** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PromptInputs
   * const promptInputs = await prisma.promptInput.findMany()
   * ```
   */
  get promptInput(): Prisma.PromptInputDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
    ? "Please either choose `select` or `omit`."
    : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Uint8Array
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    PromptTemplate: "PromptTemplate";
    PromptInput: "PromptInput";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "promptTemplate" | "promptInput";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      PromptTemplate: {
        payload: Prisma.$PromptTemplatePayload<ExtArgs>;
        fields: Prisma.PromptTemplateFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PromptTemplateFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PromptTemplateFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>;
          };
          findFirst: {
            args: Prisma.PromptTemplateFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PromptTemplateFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>;
          };
          findMany: {
            args: Prisma.PromptTemplateFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>[];
          };
          create: {
            args: Prisma.PromptTemplateCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>;
          };
          createMany: {
            args: Prisma.PromptTemplateCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PromptTemplateCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>[];
          };
          delete: {
            args: Prisma.PromptTemplateDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>;
          };
          update: {
            args: Prisma.PromptTemplateUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>;
          };
          deleteMany: {
            args: Prisma.PromptTemplateDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PromptTemplateUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.PromptTemplateUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>[];
          };
          upsert: {
            args: Prisma.PromptTemplateUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptTemplatePayload>;
          };
          aggregate: {
            args: Prisma.PromptTemplateAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePromptTemplate>;
          };
          groupBy: {
            args: Prisma.PromptTemplateGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PromptTemplateGroupByOutputType>[];
          };
          count: {
            args: Prisma.PromptTemplateCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<PromptTemplateCountAggregateOutputType>
              | number;
          };
        };
      };
      PromptInput: {
        payload: Prisma.$PromptInputPayload<ExtArgs>;
        fields: Prisma.PromptInputFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PromptInputFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PromptInputFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>;
          };
          findFirst: {
            args: Prisma.PromptInputFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PromptInputFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>;
          };
          findMany: {
            args: Prisma.PromptInputFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>[];
          };
          create: {
            args: Prisma.PromptInputCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>;
          };
          createMany: {
            args: Prisma.PromptInputCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PromptInputCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>[];
          };
          delete: {
            args: Prisma.PromptInputDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>;
          };
          update: {
            args: Prisma.PromptInputUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>;
          };
          deleteMany: {
            args: Prisma.PromptInputDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PromptInputUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.PromptInputUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>[];
          };
          upsert: {
            args: Prisma.PromptInputUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PromptInputPayload>;
          };
          aggregate: {
            args: Prisma.PromptInputAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePromptInput>;
          };
          groupBy: {
            args: Prisma.PromptInputGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PromptInputGroupByOutputType>[];
          };
          count: {
            args: Prisma.PromptInputCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<PromptInputCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    promptTemplate?: PromptTemplateOmit;
    promptInput?: PromptInputOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type PromptTemplateCountOutputType
   */

  export type PromptTemplateCountOutputType = {
    PromptInput: number;
  };

  export type PromptTemplateCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    PromptInput?: boolean | PromptTemplateCountOutputTypeCountPromptInputArgs;
  };

  // Custom InputTypes
  /**
   * PromptTemplateCountOutputType without action
   */
  export type PromptTemplateCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplateCountOutputType
     */
    select?: PromptTemplateCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PromptTemplateCountOutputType without action
   */
  export type PromptTemplateCountOutputTypeCountPromptInputArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: PromptInputWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model PromptTemplate
   */

  export type AggregatePromptTemplate = {
    _count: PromptTemplateCountAggregateOutputType | null;
    _min: PromptTemplateMinAggregateOutputType | null;
    _max: PromptTemplateMaxAggregateOutputType | null;
  };

  export type PromptTemplateMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    template: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PromptTemplateMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    template: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PromptTemplateCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    template: number;
    variables: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PromptTemplateMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    template?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PromptTemplateMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    template?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PromptTemplateCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    template?: true;
    variables?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PromptTemplateAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which PromptTemplate to aggregate.
     */
    where?: PromptTemplateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?:
      | PromptTemplateOrderByWithRelationInput
      | PromptTemplateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PromptTemplateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptTemplates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PromptTemplates
     **/
    _count?: true | PromptTemplateCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PromptTemplateMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PromptTemplateMaxAggregateInputType;
  };

  export type GetPromptTemplateAggregateType<
    T extends PromptTemplateAggregateArgs
  > = {
    [P in keyof T & keyof AggregatePromptTemplate]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromptTemplate[P]>
      : GetScalarType<T[P], AggregatePromptTemplate[P]>;
  };

  export type PromptTemplateGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: PromptTemplateWhereInput;
    orderBy?:
      | PromptTemplateOrderByWithAggregationInput
      | PromptTemplateOrderByWithAggregationInput[];
    by: PromptTemplateScalarFieldEnum[] | PromptTemplateScalarFieldEnum;
    having?: PromptTemplateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromptTemplateCountAggregateInputType | true;
    _min?: PromptTemplateMinAggregateInputType;
    _max?: PromptTemplateMaxAggregateInputType;
  };

  export type PromptTemplateGroupByOutputType = {
    id: string;
    name: string;
    description: string;
    template: string;
    variables: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: PromptTemplateCountAggregateOutputType | null;
    _min: PromptTemplateMinAggregateOutputType | null;
    _max: PromptTemplateMaxAggregateOutputType | null;
  };

  type GetPromptTemplateGroupByPayload<T extends PromptTemplateGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<PromptTemplateGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof PromptTemplateGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromptTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], PromptTemplateGroupByOutputType[P]>;
        }
      >
    >;

  export type PromptTemplateSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      template?: boolean;
      variables?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      PromptInput?: boolean | PromptTemplate$PromptInputArgs<ExtArgs>;
      _count?: boolean | PromptTemplateCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["promptTemplate"]
  >;

  export type PromptTemplateSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      template?: boolean;
      variables?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["promptTemplate"]
  >;

  export type PromptTemplateSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      description?: boolean;
      template?: boolean;
      variables?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["promptTemplate"]
  >;

  export type PromptTemplateSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    template?: boolean;
    variables?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PromptTemplateOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    | "id"
    | "name"
    | "description"
    | "template"
    | "variables"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["promptTemplate"]
  >;
  export type PromptTemplateInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    PromptInput?: boolean | PromptTemplate$PromptInputArgs<ExtArgs>;
    _count?: boolean | PromptTemplateCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type PromptTemplateIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};
  export type PromptTemplateIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};

  export type $PromptTemplatePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: "PromptTemplate";
    objects: {
      PromptInput: Prisma.$PromptInputPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        description: string;
        template: string;
        variables: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["promptTemplate"]
    >;
    composites: {};
  };

  type PromptTemplateGetPayload<
    S extends boolean | null | undefined | PromptTemplateDefaultArgs
  > = $Result.GetResult<Prisma.$PromptTemplatePayload, S>;

  type PromptTemplateCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<
    PromptTemplateFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: PromptTemplateCountAggregateInputType | true;
  };

  export interface PromptTemplateDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["PromptTemplate"];
      meta: { name: "PromptTemplate" };
    };
    /**
     * Find zero or one PromptTemplate that matches the filter.
     * @param {PromptTemplateFindUniqueArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromptTemplateFindUniqueArgs>(
      args: SelectSubset<T, PromptTemplateFindUniqueArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one PromptTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromptTemplateFindUniqueOrThrowArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromptTemplateFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PromptTemplateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first PromptTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateFindFirstArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromptTemplateFindFirstArgs>(
      args?: SelectSubset<T, PromptTemplateFindFirstArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first PromptTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateFindFirstOrThrowArgs} args - Arguments to find a PromptTemplate
     * @example
     * // Get one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromptTemplateFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PromptTemplateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more PromptTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromptTemplates
     * const promptTemplates = await prisma.promptTemplate.findMany()
     *
     * // Get first 10 PromptTemplates
     * const promptTemplates = await prisma.promptTemplate.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const promptTemplateWithIdOnly = await prisma.promptTemplate.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PromptTemplateFindManyArgs>(
      args?: SelectSubset<T, PromptTemplateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a PromptTemplate.
     * @param {PromptTemplateCreateArgs} args - Arguments to create a PromptTemplate.
     * @example
     * // Create one PromptTemplate
     * const PromptTemplate = await prisma.promptTemplate.create({
     *   data: {
     *     // ... data to create a PromptTemplate
     *   }
     * })
     *
     */
    create<T extends PromptTemplateCreateArgs>(
      args: SelectSubset<T, PromptTemplateCreateArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many PromptTemplates.
     * @param {PromptTemplateCreateManyArgs} args - Arguments to create many PromptTemplates.
     * @example
     * // Create many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PromptTemplateCreateManyArgs>(
      args?: SelectSubset<T, PromptTemplateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many PromptTemplates and returns the data saved in the database.
     * @param {PromptTemplateCreateManyAndReturnArgs} args - Arguments to create many PromptTemplates.
     * @example
     * // Create many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PromptTemplates and only return the `id`
     * const promptTemplateWithIdOnly = await prisma.promptTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PromptTemplateCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PromptTemplateCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a PromptTemplate.
     * @param {PromptTemplateDeleteArgs} args - Arguments to delete one PromptTemplate.
     * @example
     * // Delete one PromptTemplate
     * const PromptTemplate = await prisma.promptTemplate.delete({
     *   where: {
     *     // ... filter to delete one PromptTemplate
     *   }
     * })
     *
     */
    delete<T extends PromptTemplateDeleteArgs>(
      args: SelectSubset<T, PromptTemplateDeleteArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one PromptTemplate.
     * @param {PromptTemplateUpdateArgs} args - Arguments to update one PromptTemplate.
     * @example
     * // Update one PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PromptTemplateUpdateArgs>(
      args: SelectSubset<T, PromptTemplateUpdateArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more PromptTemplates.
     * @param {PromptTemplateDeleteManyArgs} args - Arguments to filter PromptTemplates to delete.
     * @example
     * // Delete a few PromptTemplates
     * const { count } = await prisma.promptTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PromptTemplateDeleteManyArgs>(
      args?: SelectSubset<T, PromptTemplateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PromptTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PromptTemplateUpdateManyArgs>(
      args: SelectSubset<T, PromptTemplateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PromptTemplates and returns the data updated in the database.
     * @param {PromptTemplateUpdateManyAndReturnArgs} args - Arguments to update many PromptTemplates.
     * @example
     * // Update many PromptTemplates
     * const promptTemplate = await prisma.promptTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PromptTemplates and only return the `id`
     * const promptTemplateWithIdOnly = await prisma.promptTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PromptTemplateUpdateManyAndReturnArgs>(
      args: SelectSubset<T, PromptTemplateUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one PromptTemplate.
     * @param {PromptTemplateUpsertArgs} args - Arguments to update or create a PromptTemplate.
     * @example
     * // Update or create a PromptTemplate
     * const promptTemplate = await prisma.promptTemplate.upsert({
     *   create: {
     *     // ... data to create a PromptTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromptTemplate we want to update
     *   }
     * })
     */
    upsert<T extends PromptTemplateUpsertArgs>(
      args: SelectSubset<T, PromptTemplateUpsertArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      $Result.GetResult<
        Prisma.$PromptTemplatePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of PromptTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateCountArgs} args - Arguments to filter PromptTemplates to count.
     * @example
     * // Count the number of PromptTemplates
     * const count = await prisma.promptTemplate.count({
     *   where: {
     *     // ... the filter for the PromptTemplates we want to count
     *   }
     * })
     **/
    count<T extends PromptTemplateCountArgs>(
      args?: Subset<T, PromptTemplateCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], PromptTemplateCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a PromptTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PromptTemplateAggregateArgs>(
      args: Subset<T, PromptTemplateAggregateArgs>
    ): Prisma.PrismaPromise<GetPromptTemplateAggregateType<T>>;

    /**
     * Group by PromptTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PromptTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromptTemplateGroupByArgs["orderBy"] }
        : { orderBy?: PromptTemplateGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, PromptTemplateGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetPromptTemplateGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PromptTemplate model
     */
    readonly fields: PromptTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromptTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromptTemplateClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    PromptInput<T extends PromptTemplate$PromptInputArgs<ExtArgs> = {}>(
      args?: Subset<T, PromptTemplate$PromptInputArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$PromptInputPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the PromptTemplate model
   */
  interface PromptTemplateFieldRefs {
    readonly id: FieldRef<"PromptTemplate", "String">;
    readonly name: FieldRef<"PromptTemplate", "String">;
    readonly description: FieldRef<"PromptTemplate", "String">;
    readonly template: FieldRef<"PromptTemplate", "String">;
    readonly variables: FieldRef<"PromptTemplate", "Json">;
    readonly createdAt: FieldRef<"PromptTemplate", "DateTime">;
    readonly updatedAt: FieldRef<"PromptTemplate", "DateTime">;
  }

  // Custom InputTypes
  /**
   * PromptTemplate findUnique
   */
  export type PromptTemplateFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where: PromptTemplateWhereUniqueInput;
  };

  /**
   * PromptTemplate findUniqueOrThrow
   */
  export type PromptTemplateFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where: PromptTemplateWhereUniqueInput;
  };

  /**
   * PromptTemplate findFirst
   */
  export type PromptTemplateFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where?: PromptTemplateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?:
      | PromptTemplateOrderByWithRelationInput
      | PromptTemplateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PromptTemplates.
     */
    cursor?: PromptTemplateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptTemplates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromptTemplates.
     */
    distinct?: PromptTemplateScalarFieldEnum | PromptTemplateScalarFieldEnum[];
  };

  /**
   * PromptTemplate findFirstOrThrow
   */
  export type PromptTemplateFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * Filter, which PromptTemplate to fetch.
     */
    where?: PromptTemplateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?:
      | PromptTemplateOrderByWithRelationInput
      | PromptTemplateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PromptTemplates.
     */
    cursor?: PromptTemplateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptTemplates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromptTemplates.
     */
    distinct?: PromptTemplateScalarFieldEnum | PromptTemplateScalarFieldEnum[];
  };

  /**
   * PromptTemplate findMany
   */
  export type PromptTemplateFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * Filter, which PromptTemplates to fetch.
     */
    where?: PromptTemplateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptTemplates to fetch.
     */
    orderBy?:
      | PromptTemplateOrderByWithRelationInput
      | PromptTemplateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PromptTemplates.
     */
    cursor?: PromptTemplateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptTemplates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptTemplates.
     */
    skip?: number;
    distinct?: PromptTemplateScalarFieldEnum | PromptTemplateScalarFieldEnum[];
  };

  /**
   * PromptTemplate create
   */
  export type PromptTemplateCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * The data needed to create a PromptTemplate.
     */
    data: XOR<PromptTemplateCreateInput, PromptTemplateUncheckedCreateInput>;
  };

  /**
   * PromptTemplate createMany
   */
  export type PromptTemplateCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many PromptTemplates.
     */
    data: PromptTemplateCreateManyInput | PromptTemplateCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PromptTemplate createManyAndReturn
   */
  export type PromptTemplateCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * The data used to create many PromptTemplates.
     */
    data: PromptTemplateCreateManyInput | PromptTemplateCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PromptTemplate update
   */
  export type PromptTemplateUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * The data needed to update a PromptTemplate.
     */
    data: XOR<PromptTemplateUpdateInput, PromptTemplateUncheckedUpdateInput>;
    /**
     * Choose, which PromptTemplate to update.
     */
    where: PromptTemplateWhereUniqueInput;
  };

  /**
   * PromptTemplate updateMany
   */
  export type PromptTemplateUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update PromptTemplates.
     */
    data: XOR<
      PromptTemplateUpdateManyMutationInput,
      PromptTemplateUncheckedUpdateManyInput
    >;
    /**
     * Filter which PromptTemplates to update
     */
    where?: PromptTemplateWhereInput;
    /**
     * Limit how many PromptTemplates to update.
     */
    limit?: number;
  };

  /**
   * PromptTemplate updateManyAndReturn
   */
  export type PromptTemplateUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * The data used to update PromptTemplates.
     */
    data: XOR<
      PromptTemplateUpdateManyMutationInput,
      PromptTemplateUncheckedUpdateManyInput
    >;
    /**
     * Filter which PromptTemplates to update
     */
    where?: PromptTemplateWhereInput;
    /**
     * Limit how many PromptTemplates to update.
     */
    limit?: number;
  };

  /**
   * PromptTemplate upsert
   */
  export type PromptTemplateUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * The filter to search for the PromptTemplate to update in case it exists.
     */
    where: PromptTemplateWhereUniqueInput;
    /**
     * In case the PromptTemplate found by the `where` argument doesn't exist, create a new PromptTemplate with this data.
     */
    create: XOR<PromptTemplateCreateInput, PromptTemplateUncheckedCreateInput>;
    /**
     * In case the PromptTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromptTemplateUpdateInput, PromptTemplateUncheckedUpdateInput>;
  };

  /**
   * PromptTemplate delete
   */
  export type PromptTemplateDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
    /**
     * Filter which PromptTemplate to delete.
     */
    where: PromptTemplateWhereUniqueInput;
  };

  /**
   * PromptTemplate deleteMany
   */
  export type PromptTemplateDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which PromptTemplates to delete
     */
    where?: PromptTemplateWhereInput;
    /**
     * Limit how many PromptTemplates to delete.
     */
    limit?: number;
  };

  /**
   * PromptTemplate.PromptInput
   */
  export type PromptTemplate$PromptInputArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    where?: PromptInputWhereInput;
    orderBy?:
      | PromptInputOrderByWithRelationInput
      | PromptInputOrderByWithRelationInput[];
    cursor?: PromptInputWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PromptInputScalarFieldEnum | PromptInputScalarFieldEnum[];
  };

  /**
   * PromptTemplate without action
   */
  export type PromptTemplateDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptTemplate
     */
    select?: PromptTemplateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptTemplate
     */
    omit?: PromptTemplateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptTemplateInclude<ExtArgs> | null;
  };

  /**
   * Model PromptInput
   */

  export type AggregatePromptInput = {
    _count: PromptInputCountAggregateOutputType | null;
    _min: PromptInputMinAggregateOutputType | null;
    _max: PromptInputMaxAggregateOutputType | null;
  };

  export type PromptInputMinAggregateOutputType = {
    id: string | null;
    templateId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PromptInputMaxAggregateOutputType = {
    id: string | null;
    templateId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PromptInputCountAggregateOutputType = {
    id: number;
    templateId: number;
    input: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PromptInputMinAggregateInputType = {
    id?: true;
    templateId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PromptInputMaxAggregateInputType = {
    id?: true;
    templateId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PromptInputCountAggregateInputType = {
    id?: true;
    templateId?: true;
    input?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PromptInputAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which PromptInput to aggregate.
     */
    where?: PromptInputWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptInputs to fetch.
     */
    orderBy?:
      | PromptInputOrderByWithRelationInput
      | PromptInputOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PromptInputWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptInputs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptInputs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PromptInputs
     **/
    _count?: true | PromptInputCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PromptInputMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PromptInputMaxAggregateInputType;
  };

  export type GetPromptInputAggregateType<T extends PromptInputAggregateArgs> =
    {
      [P in keyof T & keyof AggregatePromptInput]: P extends "_count" | "count"
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregatePromptInput[P]>
        : GetScalarType<T[P], AggregatePromptInput[P]>;
    };

  export type PromptInputGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: PromptInputWhereInput;
    orderBy?:
      | PromptInputOrderByWithAggregationInput
      | PromptInputOrderByWithAggregationInput[];
    by: PromptInputScalarFieldEnum[] | PromptInputScalarFieldEnum;
    having?: PromptInputScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PromptInputCountAggregateInputType | true;
    _min?: PromptInputMinAggregateInputType;
    _max?: PromptInputMaxAggregateInputType;
  };

  export type PromptInputGroupByOutputType = {
    id: string;
    templateId: string;
    input: JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: PromptInputCountAggregateOutputType | null;
    _min: PromptInputMinAggregateOutputType | null;
    _max: PromptInputMaxAggregateOutputType | null;
  };

  type GetPromptInputGroupByPayload<T extends PromptInputGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<PromptInputGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof PromptInputGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromptInputGroupByOutputType[P]>
            : GetScalarType<T[P], PromptInputGroupByOutputType[P]>;
        }
      >
    >;

  export type PromptInputSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      templateId?: boolean;
      input?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      template?: boolean | PromptTemplateDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["promptInput"]
  >;

  export type PromptInputSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      templateId?: boolean;
      input?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      template?: boolean | PromptTemplateDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["promptInput"]
  >;

  export type PromptInputSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      templateId?: boolean;
      input?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      template?: boolean | PromptTemplateDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["promptInput"]
  >;

  export type PromptInputSelectScalar = {
    id?: boolean;
    templateId?: boolean;
    input?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PromptInputOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    "id" | "templateId" | "input" | "createdAt" | "updatedAt",
    ExtArgs["result"]["promptInput"]
  >;
  export type PromptInputInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    template?: boolean | PromptTemplateDefaultArgs<ExtArgs>;
  };
  export type PromptInputIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    template?: boolean | PromptTemplateDefaultArgs<ExtArgs>;
  };
  export type PromptInputIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    template?: boolean | PromptTemplateDefaultArgs<ExtArgs>;
  };

  export type $PromptInputPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: "PromptInput";
    objects: {
      template: Prisma.$PromptTemplatePayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        templateId: string;
        input: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["promptInput"]
    >;
    composites: {};
  };

  type PromptInputGetPayload<
    S extends boolean | null | undefined | PromptInputDefaultArgs
  > = $Result.GetResult<Prisma.$PromptInputPayload, S>;

  type PromptInputCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<
    PromptInputFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: PromptInputCountAggregateInputType | true;
  };

  export interface PromptInputDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["PromptInput"];
      meta: { name: "PromptInput" };
    };
    /**
     * Find zero or one PromptInput that matches the filter.
     * @param {PromptInputFindUniqueArgs} args - Arguments to find a PromptInput
     * @example
     * // Get one PromptInput
     * const promptInput = await prisma.promptInput.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromptInputFindUniqueArgs>(
      args: SelectSubset<T, PromptInputFindUniqueArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one PromptInput that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PromptInputFindUniqueOrThrowArgs} args - Arguments to find a PromptInput
     * @example
     * // Get one PromptInput
     * const promptInput = await prisma.promptInput.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromptInputFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PromptInputFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first PromptInput that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputFindFirstArgs} args - Arguments to find a PromptInput
     * @example
     * // Get one PromptInput
     * const promptInput = await prisma.promptInput.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromptInputFindFirstArgs>(
      args?: SelectSubset<T, PromptInputFindFirstArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first PromptInput that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputFindFirstOrThrowArgs} args - Arguments to find a PromptInput
     * @example
     * // Get one PromptInput
     * const promptInput = await prisma.promptInput.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromptInputFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PromptInputFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more PromptInputs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PromptInputs
     * const promptInputs = await prisma.promptInput.findMany()
     *
     * // Get first 10 PromptInputs
     * const promptInputs = await prisma.promptInput.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const promptInputWithIdOnly = await prisma.promptInput.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PromptInputFindManyArgs>(
      args?: SelectSubset<T, PromptInputFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a PromptInput.
     * @param {PromptInputCreateArgs} args - Arguments to create a PromptInput.
     * @example
     * // Create one PromptInput
     * const PromptInput = await prisma.promptInput.create({
     *   data: {
     *     // ... data to create a PromptInput
     *   }
     * })
     *
     */
    create<T extends PromptInputCreateArgs>(
      args: SelectSubset<T, PromptInputCreateArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many PromptInputs.
     * @param {PromptInputCreateManyArgs} args - Arguments to create many PromptInputs.
     * @example
     * // Create many PromptInputs
     * const promptInput = await prisma.promptInput.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PromptInputCreateManyArgs>(
      args?: SelectSubset<T, PromptInputCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many PromptInputs and returns the data saved in the database.
     * @param {PromptInputCreateManyAndReturnArgs} args - Arguments to create many PromptInputs.
     * @example
     * // Create many PromptInputs
     * const promptInput = await prisma.promptInput.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PromptInputs and only return the `id`
     * const promptInputWithIdOnly = await prisma.promptInput.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PromptInputCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PromptInputCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a PromptInput.
     * @param {PromptInputDeleteArgs} args - Arguments to delete one PromptInput.
     * @example
     * // Delete one PromptInput
     * const PromptInput = await prisma.promptInput.delete({
     *   where: {
     *     // ... filter to delete one PromptInput
     *   }
     * })
     *
     */
    delete<T extends PromptInputDeleteArgs>(
      args: SelectSubset<T, PromptInputDeleteArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one PromptInput.
     * @param {PromptInputUpdateArgs} args - Arguments to update one PromptInput.
     * @example
     * // Update one PromptInput
     * const promptInput = await prisma.promptInput.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PromptInputUpdateArgs>(
      args: SelectSubset<T, PromptInputUpdateArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more PromptInputs.
     * @param {PromptInputDeleteManyArgs} args - Arguments to filter PromptInputs to delete.
     * @example
     * // Delete a few PromptInputs
     * const { count } = await prisma.promptInput.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PromptInputDeleteManyArgs>(
      args?: SelectSubset<T, PromptInputDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PromptInputs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PromptInputs
     * const promptInput = await prisma.promptInput.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PromptInputUpdateManyArgs>(
      args: SelectSubset<T, PromptInputUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more PromptInputs and returns the data updated in the database.
     * @param {PromptInputUpdateManyAndReturnArgs} args - Arguments to update many PromptInputs.
     * @example
     * // Update many PromptInputs
     * const promptInput = await prisma.promptInput.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PromptInputs and only return the `id`
     * const promptInputWithIdOnly = await prisma.promptInput.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PromptInputUpdateManyAndReturnArgs>(
      args: SelectSubset<T, PromptInputUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one PromptInput.
     * @param {PromptInputUpsertArgs} args - Arguments to update or create a PromptInput.
     * @example
     * // Update or create a PromptInput
     * const promptInput = await prisma.promptInput.upsert({
     *   create: {
     *     // ... data to create a PromptInput
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PromptInput we want to update
     *   }
     * })
     */
    upsert<T extends PromptInputUpsertArgs>(
      args: SelectSubset<T, PromptInputUpsertArgs<ExtArgs>>
    ): Prisma__PromptInputClient<
      $Result.GetResult<
        Prisma.$PromptInputPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of PromptInputs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputCountArgs} args - Arguments to filter PromptInputs to count.
     * @example
     * // Count the number of PromptInputs
     * const count = await prisma.promptInput.count({
     *   where: {
     *     // ... the filter for the PromptInputs we want to count
     *   }
     * })
     **/
    count<T extends PromptInputCountArgs>(
      args?: Subset<T, PromptInputCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], PromptInputCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a PromptInput.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PromptInputAggregateArgs>(
      args: Subset<T, PromptInputAggregateArgs>
    ): Prisma.PrismaPromise<GetPromptInputAggregateType<T>>;

    /**
     * Group by PromptInput.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptInputGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PromptInputGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromptInputGroupByArgs["orderBy"] }
        : { orderBy?: PromptInputGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, PromptInputGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetPromptInputGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PromptInput model
     */
    readonly fields: PromptInputFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PromptInput.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromptInputClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    template<T extends PromptTemplateDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PromptTemplateDefaultArgs<ExtArgs>>
    ): Prisma__PromptTemplateClient<
      | $Result.GetResult<
          Prisma.$PromptTemplatePayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the PromptInput model
   */
  interface PromptInputFieldRefs {
    readonly id: FieldRef<"PromptInput", "String">;
    readonly templateId: FieldRef<"PromptInput", "String">;
    readonly input: FieldRef<"PromptInput", "Json">;
    readonly createdAt: FieldRef<"PromptInput", "DateTime">;
    readonly updatedAt: FieldRef<"PromptInput", "DateTime">;
  }

  // Custom InputTypes
  /**
   * PromptInput findUnique
   */
  export type PromptInputFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * Filter, which PromptInput to fetch.
     */
    where: PromptInputWhereUniqueInput;
  };

  /**
   * PromptInput findUniqueOrThrow
   */
  export type PromptInputFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * Filter, which PromptInput to fetch.
     */
    where: PromptInputWhereUniqueInput;
  };

  /**
   * PromptInput findFirst
   */
  export type PromptInputFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * Filter, which PromptInput to fetch.
     */
    where?: PromptInputWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptInputs to fetch.
     */
    orderBy?:
      | PromptInputOrderByWithRelationInput
      | PromptInputOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PromptInputs.
     */
    cursor?: PromptInputWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptInputs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptInputs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromptInputs.
     */
    distinct?: PromptInputScalarFieldEnum | PromptInputScalarFieldEnum[];
  };

  /**
   * PromptInput findFirstOrThrow
   */
  export type PromptInputFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * Filter, which PromptInput to fetch.
     */
    where?: PromptInputWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptInputs to fetch.
     */
    orderBy?:
      | PromptInputOrderByWithRelationInput
      | PromptInputOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PromptInputs.
     */
    cursor?: PromptInputWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptInputs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptInputs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PromptInputs.
     */
    distinct?: PromptInputScalarFieldEnum | PromptInputScalarFieldEnum[];
  };

  /**
   * PromptInput findMany
   */
  export type PromptInputFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * Filter, which PromptInputs to fetch.
     */
    where?: PromptInputWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PromptInputs to fetch.
     */
    orderBy?:
      | PromptInputOrderByWithRelationInput
      | PromptInputOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PromptInputs.
     */
    cursor?: PromptInputWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PromptInputs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PromptInputs.
     */
    skip?: number;
    distinct?: PromptInputScalarFieldEnum | PromptInputScalarFieldEnum[];
  };

  /**
   * PromptInput create
   */
  export type PromptInputCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * The data needed to create a PromptInput.
     */
    data: XOR<PromptInputCreateInput, PromptInputUncheckedCreateInput>;
  };

  /**
   * PromptInput createMany
   */
  export type PromptInputCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many PromptInputs.
     */
    data: PromptInputCreateManyInput | PromptInputCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * PromptInput createManyAndReturn
   */
  export type PromptInputCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * The data used to create many PromptInputs.
     */
    data: PromptInputCreateManyInput | PromptInputCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * PromptInput update
   */
  export type PromptInputUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * The data needed to update a PromptInput.
     */
    data: XOR<PromptInputUpdateInput, PromptInputUncheckedUpdateInput>;
    /**
     * Choose, which PromptInput to update.
     */
    where: PromptInputWhereUniqueInput;
  };

  /**
   * PromptInput updateMany
   */
  export type PromptInputUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update PromptInputs.
     */
    data: XOR<
      PromptInputUpdateManyMutationInput,
      PromptInputUncheckedUpdateManyInput
    >;
    /**
     * Filter which PromptInputs to update
     */
    where?: PromptInputWhereInput;
    /**
     * Limit how many PromptInputs to update.
     */
    limit?: number;
  };

  /**
   * PromptInput updateManyAndReturn
   */
  export type PromptInputUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * The data used to update PromptInputs.
     */
    data: XOR<
      PromptInputUpdateManyMutationInput,
      PromptInputUncheckedUpdateManyInput
    >;
    /**
     * Filter which PromptInputs to update
     */
    where?: PromptInputWhereInput;
    /**
     * Limit how many PromptInputs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * PromptInput upsert
   */
  export type PromptInputUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * The filter to search for the PromptInput to update in case it exists.
     */
    where: PromptInputWhereUniqueInput;
    /**
     * In case the PromptInput found by the `where` argument doesn't exist, create a new PromptInput with this data.
     */
    create: XOR<PromptInputCreateInput, PromptInputUncheckedCreateInput>;
    /**
     * In case the PromptInput was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromptInputUpdateInput, PromptInputUncheckedUpdateInput>;
  };

  /**
   * PromptInput delete
   */
  export type PromptInputDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
    /**
     * Filter which PromptInput to delete.
     */
    where: PromptInputWhereUniqueInput;
  };

  /**
   * PromptInput deleteMany
   */
  export type PromptInputDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which PromptInputs to delete
     */
    where?: PromptInputWhereInput;
    /**
     * Limit how many PromptInputs to delete.
     */
    limit?: number;
  };

  /**
   * PromptInput without action
   */
  export type PromptInputDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the PromptInput
     */
    select?: PromptInputSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PromptInput
     */
    omit?: PromptInputOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromptInputInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const PromptTemplateScalarFieldEnum: {
    id: "id";
    name: "name";
    description: "description";
    template: "template";
    variables: "variables";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type PromptTemplateScalarFieldEnum =
    (typeof PromptTemplateScalarFieldEnum)[keyof typeof PromptTemplateScalarFieldEnum];

  export const PromptInputScalarFieldEnum: {
    id: "id";
    templateId: "templateId";
    input: "input";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type PromptInputScalarFieldEnum =
    (typeof PromptInputScalarFieldEnum)[keyof typeof PromptInputScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Json"
  >;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "QueryMode"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Deep Input Types
   */

  export type PromptTemplateWhereInput = {
    AND?: PromptTemplateWhereInput | PromptTemplateWhereInput[];
    OR?: PromptTemplateWhereInput[];
    NOT?: PromptTemplateWhereInput | PromptTemplateWhereInput[];
    id?: StringFilter<"PromptTemplate"> | string;
    name?: StringFilter<"PromptTemplate"> | string;
    description?: StringFilter<"PromptTemplate"> | string;
    template?: StringFilter<"PromptTemplate"> | string;
    variables?: JsonFilter<"PromptTemplate">;
    createdAt?: DateTimeFilter<"PromptTemplate"> | Date | string;
    updatedAt?: DateTimeFilter<"PromptTemplate"> | Date | string;
    PromptInput?: PromptInputListRelationFilter;
  };

  export type PromptTemplateOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    template?: SortOrder;
    variables?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    PromptInput?: PromptInputOrderByRelationAggregateInput;
  };

  export type PromptTemplateWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      name?: string;
      AND?: PromptTemplateWhereInput | PromptTemplateWhereInput[];
      OR?: PromptTemplateWhereInput[];
      NOT?: PromptTemplateWhereInput | PromptTemplateWhereInput[];
      description?: StringFilter<"PromptTemplate"> | string;
      template?: StringFilter<"PromptTemplate"> | string;
      variables?: JsonFilter<"PromptTemplate">;
      createdAt?: DateTimeFilter<"PromptTemplate"> | Date | string;
      updatedAt?: DateTimeFilter<"PromptTemplate"> | Date | string;
      PromptInput?: PromptInputListRelationFilter;
    },
    "id" | "name"
  >;

  export type PromptTemplateOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    template?: SortOrder;
    variables?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PromptTemplateCountOrderByAggregateInput;
    _max?: PromptTemplateMaxOrderByAggregateInput;
    _min?: PromptTemplateMinOrderByAggregateInput;
  };

  export type PromptTemplateScalarWhereWithAggregatesInput = {
    AND?:
      | PromptTemplateScalarWhereWithAggregatesInput
      | PromptTemplateScalarWhereWithAggregatesInput[];
    OR?: PromptTemplateScalarWhereWithAggregatesInput[];
    NOT?:
      | PromptTemplateScalarWhereWithAggregatesInput
      | PromptTemplateScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"PromptTemplate"> | string;
    name?: StringWithAggregatesFilter<"PromptTemplate"> | string;
    description?: StringWithAggregatesFilter<"PromptTemplate"> | string;
    template?: StringWithAggregatesFilter<"PromptTemplate"> | string;
    variables?: JsonWithAggregatesFilter<"PromptTemplate">;
    createdAt?: DateTimeWithAggregatesFilter<"PromptTemplate"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"PromptTemplate"> | Date | string;
  };

  export type PromptInputWhereInput = {
    AND?: PromptInputWhereInput | PromptInputWhereInput[];
    OR?: PromptInputWhereInput[];
    NOT?: PromptInputWhereInput | PromptInputWhereInput[];
    id?: StringFilter<"PromptInput"> | string;
    templateId?: StringFilter<"PromptInput"> | string;
    input?: JsonFilter<"PromptInput">;
    createdAt?: DateTimeFilter<"PromptInput"> | Date | string;
    updatedAt?: DateTimeFilter<"PromptInput"> | Date | string;
    template?: XOR<
      PromptTemplateScalarRelationFilter,
      PromptTemplateWhereInput
    >;
  };

  export type PromptInputOrderByWithRelationInput = {
    id?: SortOrder;
    templateId?: SortOrder;
    input?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    template?: PromptTemplateOrderByWithRelationInput;
  };

  export type PromptInputWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: PromptInputWhereInput | PromptInputWhereInput[];
      OR?: PromptInputWhereInput[];
      NOT?: PromptInputWhereInput | PromptInputWhereInput[];
      templateId?: StringFilter<"PromptInput"> | string;
      input?: JsonFilter<"PromptInput">;
      createdAt?: DateTimeFilter<"PromptInput"> | Date | string;
      updatedAt?: DateTimeFilter<"PromptInput"> | Date | string;
      template?: XOR<
        PromptTemplateScalarRelationFilter,
        PromptTemplateWhereInput
      >;
    },
    "id"
  >;

  export type PromptInputOrderByWithAggregationInput = {
    id?: SortOrder;
    templateId?: SortOrder;
    input?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PromptInputCountOrderByAggregateInput;
    _max?: PromptInputMaxOrderByAggregateInput;
    _min?: PromptInputMinOrderByAggregateInput;
  };

  export type PromptInputScalarWhereWithAggregatesInput = {
    AND?:
      | PromptInputScalarWhereWithAggregatesInput
      | PromptInputScalarWhereWithAggregatesInput[];
    OR?: PromptInputScalarWhereWithAggregatesInput[];
    NOT?:
      | PromptInputScalarWhereWithAggregatesInput
      | PromptInputScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"PromptInput"> | string;
    templateId?: StringWithAggregatesFilter<"PromptInput"> | string;
    input?: JsonWithAggregatesFilter<"PromptInput">;
    createdAt?: DateTimeWithAggregatesFilter<"PromptInput"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"PromptInput"> | Date | string;
  };

  export type PromptTemplateCreateInput = {
    id?: string;
    name: string;
    description: string;
    template: string;
    variables: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    PromptInput?: PromptInputCreateNestedManyWithoutTemplateInput;
  };

  export type PromptTemplateUncheckedCreateInput = {
    id?: string;
    name: string;
    description: string;
    template: string;
    variables: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    PromptInput?: PromptInputUncheckedCreateNestedManyWithoutTemplateInput;
  };

  export type PromptTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    template?: StringFieldUpdateOperationsInput | string;
    variables?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    PromptInput?: PromptInputUpdateManyWithoutTemplateNestedInput;
  };

  export type PromptTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    template?: StringFieldUpdateOperationsInput | string;
    variables?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    PromptInput?: PromptInputUncheckedUpdateManyWithoutTemplateNestedInput;
  };

  export type PromptTemplateCreateManyInput = {
    id?: string;
    name: string;
    description: string;
    template: string;
    variables: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    template?: StringFieldUpdateOperationsInput | string;
    variables?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    template?: StringFieldUpdateOperationsInput | string;
    variables?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptInputCreateInput = {
    id?: string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    template: PromptTemplateCreateNestedOneWithoutPromptInputInput;
  };

  export type PromptInputUncheckedCreateInput = {
    id?: string;
    templateId: string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptInputUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    template?: PromptTemplateUpdateOneRequiredWithoutPromptInputNestedInput;
  };

  export type PromptInputUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    templateId?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptInputCreateManyInput = {
    id?: string;
    templateId: string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptInputUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptInputUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    templateId?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, "path">>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type PromptInputListRelationFilter = {
    every?: PromptInputWhereInput;
    some?: PromptInputWhereInput;
    none?: PromptInputWhereInput;
  };

  export type PromptInputOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PromptTemplateCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    template?: SortOrder;
    variables?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PromptTemplateMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    template?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PromptTemplateMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    template?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            "path"
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, "path">
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type PromptTemplateScalarRelationFilter = {
    is?: PromptTemplateWhereInput;
    isNot?: PromptTemplateWhereInput;
  };

  export type PromptInputCountOrderByAggregateInput = {
    id?: SortOrder;
    templateId?: SortOrder;
    input?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PromptInputMaxOrderByAggregateInput = {
    id?: SortOrder;
    templateId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PromptInputMinOrderByAggregateInput = {
    id?: SortOrder;
    templateId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PromptInputCreateNestedManyWithoutTemplateInput = {
    create?:
      | XOR<
          PromptInputCreateWithoutTemplateInput,
          PromptInputUncheckedCreateWithoutTemplateInput
        >
      | PromptInputCreateWithoutTemplateInput[]
      | PromptInputUncheckedCreateWithoutTemplateInput[];
    connectOrCreate?:
      | PromptInputCreateOrConnectWithoutTemplateInput
      | PromptInputCreateOrConnectWithoutTemplateInput[];
    createMany?: PromptInputCreateManyTemplateInputEnvelope;
    connect?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
  };

  export type PromptInputUncheckedCreateNestedManyWithoutTemplateInput = {
    create?:
      | XOR<
          PromptInputCreateWithoutTemplateInput,
          PromptInputUncheckedCreateWithoutTemplateInput
        >
      | PromptInputCreateWithoutTemplateInput[]
      | PromptInputUncheckedCreateWithoutTemplateInput[];
    connectOrCreate?:
      | PromptInputCreateOrConnectWithoutTemplateInput
      | PromptInputCreateOrConnectWithoutTemplateInput[];
    createMany?: PromptInputCreateManyTemplateInputEnvelope;
    connect?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type PromptInputUpdateManyWithoutTemplateNestedInput = {
    create?:
      | XOR<
          PromptInputCreateWithoutTemplateInput,
          PromptInputUncheckedCreateWithoutTemplateInput
        >
      | PromptInputCreateWithoutTemplateInput[]
      | PromptInputUncheckedCreateWithoutTemplateInput[];
    connectOrCreate?:
      | PromptInputCreateOrConnectWithoutTemplateInput
      | PromptInputCreateOrConnectWithoutTemplateInput[];
    upsert?:
      | PromptInputUpsertWithWhereUniqueWithoutTemplateInput
      | PromptInputUpsertWithWhereUniqueWithoutTemplateInput[];
    createMany?: PromptInputCreateManyTemplateInputEnvelope;
    set?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    disconnect?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    delete?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    connect?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    update?:
      | PromptInputUpdateWithWhereUniqueWithoutTemplateInput
      | PromptInputUpdateWithWhereUniqueWithoutTemplateInput[];
    updateMany?:
      | PromptInputUpdateManyWithWhereWithoutTemplateInput
      | PromptInputUpdateManyWithWhereWithoutTemplateInput[];
    deleteMany?: PromptInputScalarWhereInput | PromptInputScalarWhereInput[];
  };

  export type PromptInputUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?:
      | XOR<
          PromptInputCreateWithoutTemplateInput,
          PromptInputUncheckedCreateWithoutTemplateInput
        >
      | PromptInputCreateWithoutTemplateInput[]
      | PromptInputUncheckedCreateWithoutTemplateInput[];
    connectOrCreate?:
      | PromptInputCreateOrConnectWithoutTemplateInput
      | PromptInputCreateOrConnectWithoutTemplateInput[];
    upsert?:
      | PromptInputUpsertWithWhereUniqueWithoutTemplateInput
      | PromptInputUpsertWithWhereUniqueWithoutTemplateInput[];
    createMany?: PromptInputCreateManyTemplateInputEnvelope;
    set?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    disconnect?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    delete?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    connect?: PromptInputWhereUniqueInput | PromptInputWhereUniqueInput[];
    update?:
      | PromptInputUpdateWithWhereUniqueWithoutTemplateInput
      | PromptInputUpdateWithWhereUniqueWithoutTemplateInput[];
    updateMany?:
      | PromptInputUpdateManyWithWhereWithoutTemplateInput
      | PromptInputUpdateManyWithWhereWithoutTemplateInput[];
    deleteMany?: PromptInputScalarWhereInput | PromptInputScalarWhereInput[];
  };

  export type PromptTemplateCreateNestedOneWithoutPromptInputInput = {
    create?: XOR<
      PromptTemplateCreateWithoutPromptInputInput,
      PromptTemplateUncheckedCreateWithoutPromptInputInput
    >;
    connectOrCreate?: PromptTemplateCreateOrConnectWithoutPromptInputInput;
    connect?: PromptTemplateWhereUniqueInput;
  };

  export type PromptTemplateUpdateOneRequiredWithoutPromptInputNestedInput = {
    create?: XOR<
      PromptTemplateCreateWithoutPromptInputInput,
      PromptTemplateUncheckedCreateWithoutPromptInputInput
    >;
    connectOrCreate?: PromptTemplateCreateOrConnectWithoutPromptInputInput;
    upsert?: PromptTemplateUpsertWithoutPromptInputInput;
    connect?: PromptTemplateWhereUniqueInput;
    update?: XOR<
      XOR<
        PromptTemplateUpdateToOneWithWhereWithoutPromptInputInput,
        PromptTemplateUpdateWithoutPromptInputInput
      >,
      PromptTemplateUncheckedUpdateWithoutPromptInputInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, "path">
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, "path">>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type PromptInputCreateWithoutTemplateInput = {
    id?: string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptInputUncheckedCreateWithoutTemplateInput = {
    id?: string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptInputCreateOrConnectWithoutTemplateInput = {
    where: PromptInputWhereUniqueInput;
    create: XOR<
      PromptInputCreateWithoutTemplateInput,
      PromptInputUncheckedCreateWithoutTemplateInput
    >;
  };

  export type PromptInputCreateManyTemplateInputEnvelope = {
    data:
      | PromptInputCreateManyTemplateInput
      | PromptInputCreateManyTemplateInput[];
    skipDuplicates?: boolean;
  };

  export type PromptInputUpsertWithWhereUniqueWithoutTemplateInput = {
    where: PromptInputWhereUniqueInput;
    update: XOR<
      PromptInputUpdateWithoutTemplateInput,
      PromptInputUncheckedUpdateWithoutTemplateInput
    >;
    create: XOR<
      PromptInputCreateWithoutTemplateInput,
      PromptInputUncheckedCreateWithoutTemplateInput
    >;
  };

  export type PromptInputUpdateWithWhereUniqueWithoutTemplateInput = {
    where: PromptInputWhereUniqueInput;
    data: XOR<
      PromptInputUpdateWithoutTemplateInput,
      PromptInputUncheckedUpdateWithoutTemplateInput
    >;
  };

  export type PromptInputUpdateManyWithWhereWithoutTemplateInput = {
    where: PromptInputScalarWhereInput;
    data: XOR<
      PromptInputUpdateManyMutationInput,
      PromptInputUncheckedUpdateManyWithoutTemplateInput
    >;
  };

  export type PromptInputScalarWhereInput = {
    AND?: PromptInputScalarWhereInput | PromptInputScalarWhereInput[];
    OR?: PromptInputScalarWhereInput[];
    NOT?: PromptInputScalarWhereInput | PromptInputScalarWhereInput[];
    id?: StringFilter<"PromptInput"> | string;
    templateId?: StringFilter<"PromptInput"> | string;
    input?: JsonFilter<"PromptInput">;
    createdAt?: DateTimeFilter<"PromptInput"> | Date | string;
    updatedAt?: DateTimeFilter<"PromptInput"> | Date | string;
  };

  export type PromptTemplateCreateWithoutPromptInputInput = {
    id?: string;
    name: string;
    description: string;
    template: string;
    variables: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptTemplateUncheckedCreateWithoutPromptInputInput = {
    id?: string;
    name: string;
    description: string;
    template: string;
    variables: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptTemplateCreateOrConnectWithoutPromptInputInput = {
    where: PromptTemplateWhereUniqueInput;
    create: XOR<
      PromptTemplateCreateWithoutPromptInputInput,
      PromptTemplateUncheckedCreateWithoutPromptInputInput
    >;
  };

  export type PromptTemplateUpsertWithoutPromptInputInput = {
    update: XOR<
      PromptTemplateUpdateWithoutPromptInputInput,
      PromptTemplateUncheckedUpdateWithoutPromptInputInput
    >;
    create: XOR<
      PromptTemplateCreateWithoutPromptInputInput,
      PromptTemplateUncheckedCreateWithoutPromptInputInput
    >;
    where?: PromptTemplateWhereInput;
  };

  export type PromptTemplateUpdateToOneWithWhereWithoutPromptInputInput = {
    where?: PromptTemplateWhereInput;
    data: XOR<
      PromptTemplateUpdateWithoutPromptInputInput,
      PromptTemplateUncheckedUpdateWithoutPromptInputInput
    >;
  };

  export type PromptTemplateUpdateWithoutPromptInputInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    template?: StringFieldUpdateOperationsInput | string;
    variables?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptTemplateUncheckedUpdateWithoutPromptInputInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: StringFieldUpdateOperationsInput | string;
    template?: StringFieldUpdateOperationsInput | string;
    variables?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptInputCreateManyTemplateInput = {
    id?: string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PromptInputUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptInputUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PromptInputUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    input?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
