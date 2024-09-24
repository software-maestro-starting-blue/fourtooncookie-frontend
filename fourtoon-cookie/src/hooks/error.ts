import { DependencyList, EffectCallback, useEffect, useState } from "react"


export const useEffectWithErrorHandling = (effect: EffectCallback, deps?: DependencyList) => {
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const executeEffect = () => {
            try {
                return effect();
            } catch (error) {
                if (! (error instanceof Error)) return
                setError(error);
            }
        };

        const cleanup = executeEffect();

        return () => {
            setError(null);
            if (cleanup instanceof Function) cleanup();
        };
    }, deps);

    if (error) {
        throw error;
    }
}