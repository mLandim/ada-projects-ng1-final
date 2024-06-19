import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-churrasco',
  standalone: true,
  imports: [],
  templateUrl: './detalhe-churrasco.component.html',
  styleUrl: './detalhe-churrasco.component.scss'
})
export class DetalheChurrascoComponent implements OnInit{

  idRec?: string

  // @Input() set id(id: string) {
  //   this.idRec = id
  // }

  constructor(private router: ActivatedRoute) {

  }
  ngOnInit(): void {
    console.log(this.router.snapshot.params['id'])
    console.log(this.router.snapshot.paramMap.get('id'))
    this.idRec = this.router.snapshot.paramMap.get('id')?.toString()
  }
}
