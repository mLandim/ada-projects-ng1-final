import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CriacaoChurrascoComponent} from './pages/criacao-churrasco/criacao-churrasco.component'
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ListaChurrascoComponent } from './pages/lista-churrasco/lista-churrasco.component';
import { DetalheChurrascoComponent } from './pages/detalhe-churrasco/detalhe-churrasco.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'churrascos', children: [
        { path: '', component: ListaChurrascoComponent},
        { path: 'novo', component: CriacaoChurrascoComponent},
        { path: ':id', component: DetalheChurrascoComponent, title: 'Detalhe Churrasco'},
    ]},
    { path: '**', component: NotFoundComponent}
];
