
// General error model
export class ErrorModel {
    public constructor(public message: string, public status: number) { }
}

// Error model for the case that the route is't exist
export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route: string) {
        super(`Route ${route} not exist`, 404);
    }
}

// Error model for the case that the resource is't exist
export class ResourceNotFoundErrorModel extends ErrorModel {
    public constructor(id: number) {
        super(`id ${id} not exist`, 404);
    }
}

// Error model for the case that ....................
export class ValidationErrorModel extends ErrorModel {
    public constructor(message: string) {
        super(message, 400);
    }
}

// Error model for the case that for some reason, a player try to go to de admin pages
export class UnauthorizedErrorModel extends ErrorModel {
    public constructor(message: string) {
        super(message, 401);
    }
}

