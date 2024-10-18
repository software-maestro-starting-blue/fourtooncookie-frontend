import { useTranslation } from "react-i18next";


export const useTranslationWithParentName = (parentName: string) => {
    const { t } = useTranslation();

    return (key: string, additionalPaths?: string[], options?: Record<string, unknown>) => {
        const fullKey = [parentName, ...(additionalPaths || []), key].join('.');
        return t(fullKey, options);
    };
}