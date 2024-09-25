import { use } from "@js-joda/core";
import { DependencyList, EffectCallback, useEffect, useState } from "react"

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

export const useAsyncFunctionWithErrorHandling = async (func: (...args: any[]) => Promise<any>) => {
    const [throwError] = useErrorThrower();

    const execute = async (...args: any[]) => {
        try {
            return await func(...args);
        } catch (error) {
            if (! (error instanceof Error)) return;
            throwError(error);
        }
    }

    return execute;
}
