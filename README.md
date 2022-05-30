## Aprendizados:

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
