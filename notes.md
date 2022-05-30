arquivos de views são rotas

o SSR permite que um servidor node retorne o app já montado invés do bundle para ser montado no client, melhorando a indexação

chamdas api comuns dentro de uma página seram montadas no lado client 
o que pode ocasionar um ayout shift

componentss não suportam SSR só atarvés de props

formas de chamada a api:


* client --> dados dinâmicos que vão esperar serem carregados

* side --> dados dinãmicos ao abrir a tela e com indexação

* static -> dados que seram alterados com um tempo determinado
! somente para dados estáticos não dados de um usuário especifico

- 

o uso de api routes fara com que requisições fiquem mais seuras visto que não estaram visiveis ao client. ServerLess

o SSR, SSG e api routes não são executadas no client