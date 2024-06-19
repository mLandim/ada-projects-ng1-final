import { Routes } from '@angular/router';
import { canActivateGuard } from './shared/guards/can-activate.guard';
import { canActivateAdminGuard } from './shared/guards/can-activate-admin.guard';

export const routes: Routes = [
    { 
        path: 'home', 
        loadComponent: () => import('./pages/home/home.component').then(comp => comp.HomeComponent)
    },
    { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login.component').then(comp => comp.LoginComponent)
    },
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full'
    },
    { 
        path: 'churrascos', 
        loadChildren: () => import('./churrasco.routes').then(rts => rts.churrascoRoutes),
        canActivate: [canActivateGuard]
    },
    { 
        path: 'produtos', 
        loadChildren: () => import('./produtos.routes').then(rts => rts.produtosRoutes),
        canActivateChild: [canActivateAdminGuard]
    },
    { 
        path: 'erro/:status', 
        loadComponent: () => import('./pages/erro/erro.component')
    },
    { 
        path: '**', 
        loadComponent: () => import('./pages/not-found/not-found.component').then(comp => comp.NotFoundComponent)
    }

];
