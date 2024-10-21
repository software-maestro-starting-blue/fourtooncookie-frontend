import { DependencyList, EffectCallback, useEffect, useState } from "react"
import { MutationOptions, QueryFunction, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query";

const useErrorThrower = () => {
    const [error, throwError] = useState<Error | null>(null);

    if (error) {
        throw error;
    }

    return [ throwError ];
}


export const useEffectWithErrorHandling = (effect: EffectCallback, deps?: DependencyList) => {
    const [throwError] = useErrorThrower();

    useEffect(() => {
        const executeEffect = () => {
            try {
                return effect();
            } catch (error) {
                if (! (error instanceof Error)) return
                throwError(error);
            }
        };

        const cleanup = executeEffect();

        return () => {
            if (cleanup instanceof Function) cleanup();
        };
    }, deps);
}

export const useFunctionWithErrorHandling = () => {
    const [throwError] = useErrorThrower();

    const functionWithErrorHandling = <T extends (...args: any[]) => any>(func: T) => {
        return (...args: Parameters<T>): ReturnType<T> | void => {
            try {
                return func(...args);
            } catch (error) {
                if (! (error instanceof Error)) return;
                throwError(error);
            }
        }
    }

    const asyncFunctionWithErrorHandling = <T extends (...args: any[]) => Promise<any>>(func: T) => {
        return async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
            try {
                return await func(...args);
            } catch (error) {
                if (! (error instanceof Error)) return;
                throwError(error);
            }
        }
    }

    return { functionWithErrorHandling, asyncFunctionWithErrorHandling };
    
}

const cooldownSet = new Set();

export const useQueryWithErrorHandling = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>) => {
    const queryClient = useQueryClient();

    const queryResult = useQuery(queryKey, queryFn, {...options,
        enabled: !cooldownSet.has(JSON.stringify(queryKey)) && options?.enabled,
    });

    if (queryResult.error && !cooldownSet.has(JSON.stringify(queryKey))) {
        cooldownSet.add(JSON.stringify(queryKey));

        setTimeout(() => {
            cooldownSet.delete(JSON.stringify(queryKey));
            queryClient.invalidateQueries(queryKey);
        }, 10000);

        throw queryResult.error;
    }

    return queryResult;
}

export const useInfiniteQueryWithErrorHandling = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, 'queryKey' | 'queryFn'>) => {
    const queryClient = useQueryClient();

    const queryResult = useInfiniteQuery(queryKey, queryFn, {...options,
        enabled: !cooldownSet.has(JSON.stringify(queryKey)) && options?.enabled,
    });

    if (queryResult.error && !cooldownSet.has(JSON.stringify(queryKey))) {
        cooldownSet.add(JSON.stringify(queryKey));

        setTimeout(() => {
            cooldownSet.delete(JSON.stringify(queryKey));
            queryClient.invalidateQueries(queryKey);
        }, 10000);

        throw queryResult.error;
    }

    return queryResult;
}

export const useMutationWithErrorHandling = <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(mutationFn: (variables: TVariables) => Promise<TData>, options?: MutationOptions<TData, TError, TVariables, TContext>) => {
    const mutationResult = useMutation(mutationFn, options);

    if (mutationResult.error) {
        throw mutationResult.error;
    }

    return mutationResult;
}