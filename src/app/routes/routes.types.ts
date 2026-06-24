import type { Router } from "express";

export class Route{
    private static registeredRoutes: string[] = [];
    constructor(
        public path: string,
        public router: Router
    ){
        if(!this.path.startsWith("/")) throw (`${path} should start with a /`);
        if(Route.registeredRoutes.includes(this.path)) throw (`${path} already exists`);
        Route.registeredRoutes.push(this.path);
    }
}

export type Routes = Route[];