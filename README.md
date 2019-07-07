# app-alunos

## Setup
```
npm install
```

### Copilar para development e rodar servidor
```
npm run serve
```

### Copilar para production
```
npm run build
```
## Uso

### Portugues - BR

    É um app bem simples e bem intuitivo

Simplesmente apos rodar npm serve e abrir o app no navegador você estara na home onde você pode navegar enstre as 3 paginas principais do app

#### 1 - Pagina de Estudantes
Nessa pagina estara todos os estudandes do cadastrados no sistema.

Para cria um estudante simplesmente vá na pagina de estudantes e clique no botão adicionar novo e preencha o formulario.  

Apos ter isso o estudante aparecerá na tabela e você pode editar, delatar ele utilizando as opções da coluna ao lado do nome.

Ou se você clicar nele você será redirecionado para a single page desse estudante onde tera infomrações das provas que ele fez e médias de nota por materia.

    Estudantes podem ser criadas sem depender de outros valores, somente as provas com notas deles são dependentes de outros campos

#### 1.1 - Single Page de Estudantes


Nessa pagina tera as informações das provas e materias que o aluno fez, para adicionar uma nova prova simplesmente clique no botão adicionar prova e preencha o formulario.

    Note que para adicionar provas com nota ao estudante é necessario ter ao menos uma prova já cadastrada no sitema

A nota maxima Foi configurada para ser 100 pts para ser mais facil de entender, mais o sistema pode fazer calculo com numeros maiores também sem problemas.

#### 2 - Pagina de Matérias

Nessa Pagina estara todas as Matérias do sistema

Para cria uma materia clique no botão adicionar materia e preencha o formulario.

Apos isso ela já devera aparecer na tabela de materias da pagina onde você pode editar, delatar ela se quiser.

    Materias pode ser criadas sem depender de outros valores
#### 2 - Pagina de Provas

Nessa Pagina estara todas as Provas do sistema

Para criar uma Prova simplesmente clique no botão adicionar uma nova prova e preencha o formulario.
    
    Note que para criar uma Prova é necessario ter antes ao menos uma matéria cadastrada no sistema

Apos preencher o formulario a prova já devera aparecer na tabela onde você pode editar e delatar ela se quiser.

## Regras e Anotações do app
O App segue algumas regras para poder funcionar corretamente:

* Para adicionar provas e notas aos alunos é preciso ter provas cadastradas no sistema.

* Para criar provas é preciso ter materias cadastradas no sistema.