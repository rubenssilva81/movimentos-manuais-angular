import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoCosif } from '../produto-cosif';
import { MovimentoManual } from 'src/movimento.manual';
import { ProdutoService } from '../produto.service';
import { ProdutoCosifService } from '../produto-cosif.service';
import { MovimentoManualService } from '../movimento-manual.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  title = "Movimentos Manuais";

  produtos: Produto[] = [];
  produtosCosif: ProdutoCosif[] = [];  
  movimentosManuais: MovimentoManual[] = [];

  codProdutoSelecionado: string | undefined;
  codProdutoCosifSelecionado: string | undefined;

  movimentoManual: MovimentoManual = {
    datMes: 0,
    datAno: 0,
    numLancamento: 0,
    codProduto: '',
    desProduto: '',
    codCosif: '',
    desDescricao: '',
    datMovimento: '',
    codUsuario: '',
    valValor: 0
  };

  inclusao: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private produtoCosifService: ProdutoCosifService,
    private movimentoManualService : MovimentoManualService) { }
  
  ngOnInit(): void 
  {
    this.getProdutos();
  }

  getProdutos(): void 
  {
    this.produtoService
      .getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  produtoOnChange(codProduto: string): void 
  {
    this.produtosCosif = [];
    this.getProdutosCosif(codProduto);
  }
  
  produtoCosifOnChange(codCosif: string): void 
  {
    this.codProdutoCosifSelecionado = codCosif;
    this.getMovimentosManuais();
  }

  getProdutosCosif(codProduto: string): void 
  {
    this.codProdutoSelecionado = codProduto;
    this.produtoCosifService
      .getProdutosCosif(codProduto)
      .subscribe(produtosCosif => this.produtosCosif = produtosCosif);
  }

  getMovimentosManuais(): void 
  {
    if (this.codProdutoSelecionado && this.codProdutoCosifSelecionado) {
      this.movimentoManualService
        .getMovimentosManuais(this.codProdutoSelecionado, this.codProdutoCosifSelecionado)
        .subscribe(movimentosManuais => this.movimentosManuais = movimentosManuais);
    }
  }

  limpar() : void 
  {
    this.movimentoManual = {
      datMes: 0,
      datAno: 0,
      numLancamento: 0,
      codProduto: '',
      desProduto: '',
      codCosif: '',
      desDescricao: '',
      datMovimento: '',
      codUsuario: '',
      valValor: 0
    };
  }

  novo() : void 
  {
    this.inclusao = true;
  }

  inserir() : void 
  {
    if (this.codProdutoSelecionado && this.codProdutoCosifSelecionado) 
    {      
      this.movimentoManualService
        .inserir(this.movimentoManual).subscribe();
      this.inclusao = false;
      this.limpar();
      this.getMovimentosManuais();
    }
  }

}
