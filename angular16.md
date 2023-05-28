Angular 16
## Instalação

### NVM

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.bashrc
nvm --version
nvm install --lts
node -v
npm -v
```

### Angular

Para instalar o Angular CLI:

```css
npm install -g @angular/cli@14.0.0
```

Para criar um novo projeto:

```cpp
ng new memoteca
```

Para rodar o projeto entre na pasta do mesmo e digite o comando:

```cpp
ng serve
```

Visão do projeto na porta:

```cpp
http://localhost:4200
```

## Arquivos

### Component

A classe que adiciona lógica, comportamento e funcionalidades é a classe type script sendo o arquivo <nome_do_componente>.component.ts, também pode ser chamada de component.

### Criando um component

Para criar um componente use um dos comandos abaixo:

``` bash
ng generate component <nome_do_componente>
ng g c <nome_do_componente>
```

#### ngOnInit()

O que é?
	É um método que faz parte da configuração do ciclo de vida do componente.

Para que serve?
	É executado quando acontece o carregamento do componente, mais especificamente ele é chamado pelo Angular quando o componente é inicializado e todas as suas entradas e saídas são vinculadas.
	Normalmente, ele é usado para executar qualquer lógica de configuração necessária, como recuperar dados de um servidor, inicializar variáveis, assinar observáveis ou executar qualquer outra tarefa de inicialização única.

obs: todo componente criado será registrado no arquivo app.module.ts, dentro da função @NgModule

### Template

O arquivo relacionado a visualização e iteração do usuário com a página é o arquivo  <nome_do_componente>.component.html, também chamado de template.

#### Montando o Template

Para montarmos o template completo instanciando nossos componentes devemos acessar o arquivo app.component.html e colocar os seletores dos componentes, descritos dentro do componente na função @Component propriedade selector.

um exemplo de como fica o arquivo app.component.html:

``` html
<app-cabecalho></app-cabecalho>
<main>
  <app-criar-pensamento></app-criar-pensamento>
</main>
<app-rodape></app-rodape>
```

## Desenvolvimento

### Property Binding

#### Associação

Para fazer associação dos dados do component com o template precisamos seguir alguns protocolos, abaixo vamos dar um exemplo de como fazer associação de um value de um input form:

Template:

```html
<input
    ...
    [value]="pensamento.conteudo"
>
<p>
    {{ pensamento.conteudo }}
</p>
```

Component:

```typescript
pensamento = {
    id: '1',
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev'
    modelo: ''
}
```

obs: Note alguns pontos importantes no exemplo acima:
	1 - a propriedade value está entre colchetes, o que indica para o angular que essa propriedade deve ser buscada de dentro do arquivo ts
	2 - pensamento.conteudo deve ser um atributo de um objeto do tipo pensamento.
	3 - como na tag p não temos uma propriedade referente ao texto, no angular fazemos a associação da propriedade do component com o template usando ao invés do colchetes a chaves duplas, também chamado de interpolação. 
	4 - uma outra forma de renderizar a tag p seria assim: <p [textContent]="pensamento.conteudo"></p>

### Event Binding

Ações de template são realizadas por event binding, algumas ações são clicar em um botão, passar o mouse em cima de uma parte, entre outras.

Abaixo vamos dar um exemplo de um evento de click no botão:

Template

```html
<button (click)="criarPensamento()" class="botao">
    Salvar
</button>
```

Component

```typescript
criarPensamento() {
    //lógica esperada para quando o botão for criado
}
```



### Two-way Data Binding

No exemplo dado em Property Binding, quando alteramos o texto no campo input referente ao pensamento.conteudo, a tag <p> não terá seu valor alterado. Isso se dá porque o fluxo do property binding é unidirecional. Para fazermos com que o angular entenda que deve ser alterado todos os itens associados a essa propriedade, devemos utilizar diretivas angular, segue o exemplo abaixo:

Template:

```html
<input
    ...
    [(ngModel)]="pensamento.conteudo"
>
<p>
    {{ pensamento.conteudo }}
</p>
```

Component:

```typescript
pensamento = {
    id: '1',
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev'
    modelo: ''
}
```

Obs: A diretiva ngModel pertence a formsModule, para garantir que a aplicação execute essa diretiva precisamos adicionar FormsModule, dentro do array de imports no arquivo app.module.ts.

### Observable

O que é?
	Um Observable é uma classe utilizada para tratar fluxos de dados assíncronos.

Para que serve?
	Funciona igualmente como as promisses no javascript, mas com a vantagem de possuir uma transferência de dados contínua, faz parte da biblioteca RXJS, já vem instalado no Angular.

​	A principal ideia por trás dos Observables é o conceito de "stream de dados". Eles podem emitir múltiplos valores sequencialmente ao longo do tempo, permitindo que você reaja a cada valor emitido e execute lógica personalizada.

​	Os Observables possuem uma série de métodos disponíveis que permitem manipular e transformar os dados que estão sendo emitidos. Alguns desses métodos incluem `map`, `filter`, `reduce`, `merge`, `concat`, `debounceTime`, entre outros. Esses métodos permitem filtrar, transformar, combinar e controlar o fluxo de dados de acordo com as necessidades do aplicativo.

​	Para podermos utilizar devemos marcar a assinatura do método a ser utilizado recebendo a herança do Obervable na classe server.

```typescript
listar(): Observable<Pensamento[]>{
    return this.http.get<Pensamento[]>(this.API);
}
```

​	Também devemos, na classe component, quando formos chamar o método, se inscrever no Observable usando o método subscribe.

``` typescript
ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
        this.listapensamentos = listapensamentos
    });
}
```



### Módulo Router

O que é?
	É um módulo do framework Angular que permite a criação e gerenciamento de rotas em uma aplicação Angular. Ele fornece funcionalidades para navegação entre diferentes componentes com base em URLs.

Para que serve?
	É usado para criar um roteamento de página único (SPA - Single Page Application), onde a aplicação é carregada uma vez e as mudanças de página ocorrem sem recarregar toda a página. Isso resulta em uma experiência de usuário mais rápida e suave.

Principais funcinalidades:

- ​	Rotas: permite definir rotas para os componentes da sua aplicação.
- ​	Roteador de nível superior: é responsável por gerenciar o roteamento em toda a aplicação. Ele é configurado no arquivo `app-routing.module.ts` e define as rotas principais da aplicação. 
- ​    Router Outlet: uma diretiva que marca o local onde os componentes serão exibidos quando uma rota for acessada.
- ​    Links de navegação: são usados para navegar entre as diferentes rotas da aplicação.
- ​    Parâmetros de rota: permite passar parâmetros na URL para uma rota específica.
- ​    Roteamento aninhado: suporta roteamento aninhado, onde os componentes podem ter rotas internas independentes.
- ​    Guardas de rota: Os guardas de rota permitem controlar o acesso às rotas com base em determinadas condições. Eles podem ser usados para autenticação, permissões de usuário e outras verificações antes de permitir a navegação para uma rota específica.

#### Navegação com roteamento

Quando criamos alguns componentes referentes a mesma tela, exemplo, um template de criar pensamento, outro template de mostrar o pensamento, não desejamos que todos fiquem apresentado no mesmo local, fazendo que precisemos "scrollar" a tela para chegar em outra funcionalildade. Temos alguns recursos como mapear a rota por funcionalidade.

exemplo:

Para acessar o componente de criar pensamento, podemos acessar a url:

```url
localhost/criar-pensamento
```

Para acessar o componente de listar pensamento, podemos acessar a url:

```url
localhost/listar-pensamento
```

Mas como fazemos isso?

Primeiro vamos usar a diretiva do angular router-outlet. Ela é uma diretiva que reserva um espaço dinamicamente.

```html
<app-cabecalho></app-cabecalho>
<main>
  <router-outlet></router-outlet>
</main>
<app-rodape></app-rodape>
```

O próximo passo é registrar essas rotas no arquivo app-routing.module.ts, dentro do array Routes, que deverá existir caso você tenha solicitado sua criação quando criamos a aplicação.

```typescript
const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar-pensamento',
    pathMatch: 'full'
  },
  {
    path: 'criar-pensamento',
    component: CriarPensamentoComponent
  },
  {
    path: 'listar-pensamento',
    component: ListarPensamentoComponent
  }
];
```

obs: note que temos um path vazio, um criar-pensamento e o outro listar-pensamento. O path vazio serve para que quando estivermos na url raiz, ou seja, apenas localhost, seremos redirecionados para o componente listar-pensamento.

#### RouterLink

Serve para podermos fazer redirecionamentos para outras url's ou links.

```html
<button routerLink="/criar-pensamento" class="botao">Adicionar pensamento</button>
```

#### Router Navigate

Se desejarmos fazer o redirect de um método após determinada ação podemos usar o router navigate, segue o exemplo em que após a criação de um pensamento desejamos ser redirecionados a página que lista os pensamentos:

```typescript
    cancelar() {
        this.router.navigate(['/listar-pensamento'])
    }
```

#### ActivateRoute

O que é?
	O  `ActivatedRoute` é uma classe fornecida pelo Angular que representa a rota ativada no momento. Ela contém informações sobre a rota, seus parâmetros, consultas de URL e outros dados relacionados

Para que serve?
	é uma classe do Angular que fornece informações sobre a rota ativada no momento e é usado para acessar parâmetros de rota, dados, consultas de URL e realizar ações com base nesses dados. Ele é útil para personalizar o comportamento das rotas e fornecer recursos avançados de roteamento

Recursos principais:

1. Observáveis de mudanças: O `ActivatedRoute` possui propriedades observáveis que permitem acompanhar as mudanças na rota ao longo do tempo. Alguns exemplos são `params`, `queryParams`, `fragment`, `data` e `url`.
2. Roteamento aninhado: Quando você tem rotas aninhadas, ou seja, rotas dentro de outras rotas, o `ActivatedRoute` permite acessar as informações da rota pai e da rota filho. Isso é útil para realizar ações com base no contexto das rotas aninhadas.
3. Resolvers: O `ActivatedRoute` também é usado em conjunto com os resolvers do Angular. Os resolvers são usados para buscar dados antes de ativar uma rota. O `ActivatedRoute` é injetado no resolver, permitindo que você acesse os parâmetros da rota atual e tome decisões com base nesses dados ao resolver os dados necessários para a rota.
4. Navegação programática: O `ActivatedRoute` pode ser usado em conjunto com o `Router` para realizar navegações programáticas. Por exemplo, você pode navegar para uma rota específica com base em certas condições ou eventos usando informações fornecidas pelo `ActivatedRoute`.
5. Snapshot: permite acessar os parâmetros e dados da rota no momento em que a rota é ativada, fornecendo um instantâneo (snapshot) dos valores atuais da rota.

Exemplo de Snapshot:

Criando a funcionalidade excluir dentro do serviço:

```typescript
    excluir(id: number): Observable<Pensamento> {
        const url = `${this.API}/${id}`
        return this.http.delete<Pensamento>(url)
    }
```

Injetando a Funcionalidade no componente de exclusão e buscando os parâmetros de envio utilizando snapshot:

```typescript
constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
) { }

ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
        this.pensamento = pensamento
    })
}

excluirPensamento() {
    if(this.pensamento.id) {
        this.service.excluir(this.pensamento.id).subscribe(() => {
            this.router.navigate(['/listar-pensamento'])
        })
    }
}
```

### Diretivas

#### NgFor

Mostra vários elementos com a mesma estrutura básica.

pensamento.component.ts

```typescript
@Input() pensamento = {
    conteudo: 'Texto conteudo',
    autoria: 'Rodrigo'
    modelo: 'modelo1'
}
```

listar-pensamento.component.ts

```typescript
listaPensamentos = [
    {
      conteudo: 'Passo informações para o componente filho',
      autoria: 'Componente pai',
      modelo: 'modelo3'
    },
    {
      conteudo: 'Minha propriedade é decorada com @Input()',
      autoria: 'Componente filho',
      modelo: 'modelo2'
    },
];
```



```html
<div *ngFor="let pensamento of listaPensamentos">
	<app-pensamento [pensamento]="pensamento"></app-pensamento>
</div>
```

Obs: O componente pai, listar-pensamento.component, contém o array para iteração que será exibido no template, essa comunicação de herança é passada quando no componente filho <app-pensamento></app-pensamento> é interpolado com a property binding [pensamento]="pensamento" e dentro do filho na criação do objeto pensamento é usado o decorator @Input().

#### NgIf

Podemos utilizar a diretiva estrutural ngIf para renderizarmos ou não trechos de html. No exemplo abaixo estamos validando se existe ou não itens dentro da lista de pensamento, caso não houver estamos pedindo para ser exibido um elemento do angular chamado ng-template (código html que não é renderizado, apenas se instruído direto ou indiretamente pelo angular)

```html
<div class="mural" *ngIf="listaPensamentos.length > 0, else semPensamento">
    <div *ngFor="let pensamento of listaPensamentos">
		<app-pensamento [pensamento]="pensamento"></app-pensamento>
	</div>
</div>
<ng-template #semPensamentos>
    <div class="ff-inter sem-pensamentos">
        <p>Ainda não há pensamentos cadastrados!</p>
  </div>
</ng-template>
```



#### NgClass

Adiciona classes dinamicamente com a ajuda do typescript.

pensamento.component.ts

```typescript
  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }
```

pensamento.component.html

```html
<div class="pensamento {{ pensamento.modelo }} ff-roboto-mono">
    ...
</div>
```

um outro exemplo de usar ngClass

Para utilizar o ngClass com expressão basta informar a classe seguida da expressão que retorne valor booleano.

Caso a expressão retorne true a classe declarada é aplicada, como no exemplo. A propriedade active vai ser alterada para o valor contrário ao atual, se for true muda para false e vice versa:

```typescript
@Component({
  selector: 'app-home',
  template: `
    <div>
      <h1 [ngClass]="{'color-blue': active}">
        Home!
      </h1>
      <button (click)="colorBlue()">
          Mudar cor
      </button>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent {
  active: boolean = true;

  constructor() { }

  colorBlue(){
    this.active = !this.active
  }
}
```



Para saber mais: tipos de diretivas

**Diretivas de componentes**: usado com um modelo. Esse tipo de diretiva é a mais comum.

Ex: `<app-listarPensamentos>`.

**Diretivas estruturais**: altera o layout do DOM adicionando e removendo elementos DOM.

Ex: `NgIf, NgFor. NgSwitch`.

**Diretivas de atributos**: altera a aparência ou o comportamento de um elemento, componente ou outra diretiva.

Ex: `NgClass, NgStyle`.

#### Comunicação com o backend

#### JsonServe

```cdm
mkdir backend
cd backend
npm init -y
npm i json-server
touch db.json
```

```json
{
    "pensamentos" : [
        {
            "id": 1,
            "conteudo": "teste 1",
            "autoria": "Rodrigo",
            "modelo": "modelo1"
        },
        {
            "id": 2,
            "conteudo": "teste 2",
            "autoria": "Rodrigo",
            "modelo": "modelo2"
        },
        {
            "id": 3,
            "conteudo": "teste 3",
            "autoria": "Rodrigo",
            "modelo": "modelo3"
        }
    ]
}
```

``` json
"scripts": {
    "start": "json-server --watch db.json --port 3000"
}
```

```cmd
npm start
```

#### Criando um arquivo de serviço

No Angular, é tudo muito bem organizado, cada arquivo tem sua responsabilidade, ou seja, o component.ts deve conter apenas a lógica para definir comportamentos e renderização na tela. Dessa forma é importante existir um arquivo (service) que contenha toda a lógica  de negócio e responsabilidade de comunicação com o servidor.

Para criar um arquivo de serviço no angular, podemos utilizar o comando no cli abaixo:

``` cmd
ng g s <nome_do_servico>
```

[O uso de Services em Angular traz mais organização para a aplicação e permite um melhor gerenciamento das informações. Com base no que vimos sobre Services e Injeção de dependência, marque as afirmações corretas.

O decorador @Injectable informa ao Angular que essa classe é injetável e com o metadado providedIn como root torna esse serviço visível em toda aplicação.

Serviço em Angular são classes com o decorador @Injectable que informa ao Angular que pode ser injetado em componentes da aplicação.] citação do curso Alura.

Obs: Lembrando que para utilizar algumas bibliotecas precisamos fazer a importaçãop das mesmas, exemplo HttpClient, no angular precisamos importa-lá no arquivo app.module, objeto @NgModule, array de import.

#### Injeção de Dependência

Artigo abordando sobre injeção de dependência no Angular:

https://www.alura.com.br/artigos/services-injecao-dependencia-angular-o-que-sao-como-funcionam

O decorador @Injectable informa ao Angular que essa classe é injetável e com o metadado providedIn como root torna esse serviço visível em toda aplicação.

