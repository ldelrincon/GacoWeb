import { Injector } from "@angular/core";
import { AuthenticationService } from "../services/seguridad/authentication.service";

//Att:javier valenzuela
export function appInitializer(injector: Injector) {
    return () => new Promise((resolve) => {        
        const authenticationService = injector.get(AuthenticationService);        
        authenticationService.retrieveSession();
        resolve("Application start...");
    });
}