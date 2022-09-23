import { RequestListener } from "node:http"

export interface Route {
    path: string;
    method: string;
    requestHandler: RequestListener;
};

export type RouteParam = Route | Route[]