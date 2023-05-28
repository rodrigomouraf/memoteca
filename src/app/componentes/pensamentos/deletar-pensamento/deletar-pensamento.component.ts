import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deletar-pensamento',
  templateUrl: './deletar-pensamento.component.html',
  styleUrls: ['./deletar-pensamento.component.css']
})
export class DeletarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => (
      this.pensamento = pensamento
    ));
  }

  excluirPensamento() {
    this.service.deletar(this.pensamento.id).subscribe(() => (
      this.router.navigate(['/listar-pensamento'])
    ));
  }

  cancelar() {
    this.router.navigate(['/listar-pensamento'])
  }

}
