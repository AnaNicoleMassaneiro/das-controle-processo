# Trabalho Desenvolvido para a Pós-graduação em desenvolvimento ágil de software

DAS - Trabalho Desenvolvimento Web

Diagrama de classe
<img src="./src/assets/diagramaDeCl.png" alt="J" width="700"/>

O sistema tem os seguintes requisitos:

1. Uma tela para manter (incluir, atualizar, excluir e listar) os clientes da empresa (Nome, sobrenome, CPF)

a. Nesta tela deve ser possível listar todos os clientes
b. Deve ser possível atualizar os dados de um cliente.
c. Deve ser possível excluir um cliente que não possua pedidos. Se houver uma tentativa de exclusão de clientes com pedidos uma mensagem do sistema deve informar ao usuário que o cliente não pode ser excluído.

2. Uma tela simples para manter os produtos disponíveis.

3. Uma tela para incluir os pedidos novos quando são comprados

a. Um campo para informar o CPF do cliente (O CPF deve ser único)
b. Uma lista de produtos (descrição)
c. Uma maneira para selecionar um produto
d. Um botão para incluir o produto selecionado no pedido do cliente, informando a quantidade do produto.

4. Uma tela para listar o pedido de um cliente.

a. Um campo para informar o CPF do cliente.
b. Um botão para listar os itens do pedido do cliente
c. Uma tabela para mostrar os itens do pedido:


5. Diagrama do Banco de Dados
   <img src="./src/assets/diagrama.png"  alt="J" width="700"/>


# Tecnologias 
- HTML/CSS/Typescript/DOM
- Angular 13
- Servidor rodando uma API REST em Spring
