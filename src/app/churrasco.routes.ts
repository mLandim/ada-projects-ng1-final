import { Routes } from "@angular/router";
import { canDeactivateGuard } from "./shared/guards/can-deactivate.guard";
import { canMatchGuard } from "./shared/guards/can-match.guard";
import { canActivateGuard } from "./shared/guards/can-activate.guard";


export const churrascoRoutes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./pages/lista-churrasco/lista-churrasco.component').then(c => c.ListaChurrascoComponent)
    },
    { 
        path: 'novo', 
        loadComponent: () => import('./pages/criacao-churrasco/criacao-churrasco.component').then(c => c.CriacaoChurrascoComponent)
    },
    { 
        path: ':id', 
        loadComponent: () => import('./pages/detalhe-churrasco/detalhe-churrasco.component').then(c => c.DetalheChurrascoComponent), 
        title: 'Detalhe Churrasco',
        canDeactivate: [canDeactivateGuard]
        
    }
]