## Aprendizados:

arquivos de views são rotas

o SSR permite que um servidor node retorne o app já montado invés do bundle para ser montado no client, melhorando a indexação

chamadas api comuns dentro de uma página seram montadas no lado client 
o que pode ocasionar um layout shift

components não suportam SSR só atarvés de props

formas de chamada a api:

* client --> dados dinâmicos que vão esperar serem carregados

* side --> dados dinãmicos ao abrir a tela e com indexação

* static -> dados que seram alterados com um tempo determinado
! somente para dados estáticos não dados de um usuário especifico

- 

o uso de api routes fara com que requisições fiquem mais seuras visto que não estaram visiveis ao client. ServerLess

o SSR, SSG e api routes  são executadas no server


* funcionamento do next:

O next atua como servidor node que intepreta o javascript do vindo do 
e serve a página já montada para o browser. SSR

* Onde realizar operações que utilizam credenciais secretas?

    - getStaticProps (SSR) 
    - getServerSideProps (SSG)
    - Api routes

    mas as que usam server side não poderam reagir a interações somente no momento da renderização      

    * O Stripe usa uma api para front end e outra para interações backend  

    * Toda a variavel ambiente que será carregada no browser tem set uma 
    NEXT_PUBLIC key

--
notas 08/2022
## NOVOS APRENDIZADOS:

* Sempre que possível realizar a formatação de dados logo após o consumo 
* Proprierty prefetch na tag Link permite fazer um carregamento antecipado dados 
* cloneElement para passar props parent to children 
* asPath para captar path da URL atual
* staticProps X serverSideProps:
    - static: permite pegar dados de forma mais rápida que só serão alterados em um determinado tempo
    - serverSide: chamadas a api são feitas do lado servidor e ainda permitem informaçẽs de de req como cookies e saber se o usuário está logado
* as páginas estáticas podem ser geradas no momento da build ou no primeiro acesso. 
  a geração durante build pode ser usada para páginas mais pesadas ou que guardam conteúdos mais importantes.  
