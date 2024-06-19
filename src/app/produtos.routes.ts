import { Routes } from "@angular/router";

export const produtosRoutes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./pages/lista-produtos/lista-produtos.component').then(c => c.ListaProdutosComponent)
    },
    {
        path: ':produto',
        loadComponent: () => import('./pages/criacao-produto/criacao-produto.component').then(c => c.CriacaoProdutoComponent),
        title: 'Churrascometro - Criação de Produtos',
    },
    {
        path: ':produto/:id',
        loadComponent: () => import('./pages/criacao-produto/criacao-produto.component').then(c => c.CriacaoProdutoComponent),
        title: 'Churrascometro - Edição de Produtos',
    },
]