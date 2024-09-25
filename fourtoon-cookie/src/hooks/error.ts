import { DependencyList, EffectCallback, useEffect, useState } from "react"
import { MutationOptions, QueryFunction, QueryKey, useMutation, useQuery, UseQueryOptions } from "react-query";

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

export const asyncFunctionWithErrorHandling = <T extends (...args: any[]) => Promise<any>>(func: T) => {
    const [throwError] = useErrorThrower();

    const execute = async (...args: Parameters<T>): Promise<ReturnType<T> | void> => {
        try {
            return await func(...args);
        } catch (error) {
            if (! (error instanceof Error)) return;
            throwError(error);
        }
    }

    return execute;
}

export const useQueryWithErrorHandling = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>) => {
    const queryResult = useQuery(queryKey, queryFn, options);

    if (queryResult.error) {
        throw queryResult.error;
    }

    return queryResult;
}

export const useInfiniteQueryWithErrorHandling = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(queryKey: TQueryKey, queryFn: QueryFunction<TQueryFnData, TQueryKey>, options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>) => {
    const queryResult = useQuery(queryKey, queryFn, options);

    if (queryResult.error) {
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