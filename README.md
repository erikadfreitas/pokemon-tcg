# PokemonTCG

Projeto de uma aplicação que consultas as cartas da [API Pokémon TCG](https://docs.pokemontcg.io/#api_v1cards_list) para que o usuário possa criar baralhos a partir delas.

Projeto realizado como desafio de um processo seletivo.

## Especificações
- Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli), na versão 16.2.7.

- Foi utilizado [Tailwind CSS](https://tailwindcss.com/), na versão 3.3.4.

- A biblioteca UI utilizada foi [Ignite UI](https://www.infragistics.com/products/ignite-ui), produto da Infragistics, na versão 16.1.3.

## Funcionalidades
Neste projeto, até o momento, foram desenvolvidas as funcionalidade subcitadas.

As funcionalidades em **negrito** não foram solicitadas no desafio, mas foram concluídas.

### Lista de baralhos

- [x] O usuário pode ver seus baralhos.
- [x] O usuário pode criar um novo baralho.
- [x] O usuário pode remover um baralho.
- [x] O usuário pode editar um baralho.
- [x] O usuário pode clicar num baralho para visualizar seus detalhes.

### Criação de um baralho

- [x] O usuário pode colocar um nome no seu baralho.
- [x] O usuário pode inserir cartas no baralho.
- [x] O baralho tem que ter no mínimo 24 cartas e no máximo 60.
- [x] Só podem ter 4 cartas com o mesmo nome, no baralho.
- [x] Após salvar o baralho voltamos para a página de lista de baralhos atualizada.
- [x] O baralho será salvo apenas em memória.
- [x] **Para reduzir o tempo das requisições que retornam as cartas, foi implementado um filtro que deve ser utilizado para retornar as cartas. O usuário deve pesquisar as cartas a partir do nome delas, informando, pelo menos, três caracteres para realizar a pesquisa.**
- [x] **Na lista de cartas, para facilitar a visualização, elas retornam em ordem alfabética e separadas por grupos de Pokémon, Trainer ou Energy.**
- [x] **As cartas selecionadas aparecem na tela em tamanho menor, mas é possível ampliar a imagem ao passar o mouse sobre a carta desejada e clicar em Ampliar. Passando o mouse pela carta também aparece o botão no qual ela pode ser removida das cartas do baralhos.**

### Detalhes do baralho

- [x] O usuário consegue ver quantos pokemons e cartas de treinador existem no baralho.
- [x] **O usuário consegue ver quantas cartas de energia existem no baralho.**
- [x] O usuário consegue ver de quantas cores é o baralho, quantos types únicos existem no baralho.
- [x] **O usuário consegue ver quais são as cores que existem no baralho.**

### Extras

- [x] **Tela de erro ao tentar acessar uma página inexistente. Basta tentar acessar qualquer rota que não foi definida no projeto.**

### Sugestões de funcionalidades para desenvolvimento futuro

- [ ] Criar um novo campo no criar/editar baralhos para que o usuário escolha por qual atributo de cartas elas devem ser pesquisadas.

## Como rodar o projeto

- Após o clone do projeto, acesse a pasta dele e execute `npm install` para instalar as dependências.
- Quando as dependências forem instaladas, execute `ng serve`.
- Navegue até `http://localhost:4200/`.

## Contato

Fale com a desenvolvedora do projeto através do e-mail erikadfreitas@gmail.com.
