import {lazy} from "react";

export const lazyImportPage = (path: string) => lazy(async () => {
    const module = await import(`../../pages/${path}/index.ts`);
    return { default: module.default || Object.values(module)[0] };
});

export const lazyImportFeature = (path: string) => lazy(async () => {
    const module = await import(`../../features/${path}/index.ts`);
    return { default: module.default || Object.values(module)[0] };
});


export const lazyImportWidget = (path: string) => lazy(async () => {
    const module = await import(`../../widgets/${path}/index.ts`);
    return { default: module.default || Object.values(module)[0] };
});

export const lazyImportEntity = (path: string) => lazy(async () => {
    const module = await import(`../../entities/${path}/index.ts`);
    return { default: module.default || Object.values(module)[0] };
});

