import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}}`} dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className={styles.continueReading}>
          Wanna Continue Reading ?
          <Link href="/">
            <a href="">Subscribe Now 🤗</a>
          </Link>
        </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { 
    // usando params e slug posse escolher oq ue vai ser gerado estsaticamente 
    paths: [],
    fallback: 'blocking'
    /*
    true - a page que não for geradas de forma estatica será criada em client side 
    blocking - os conteudos que não foram gerados esticamente serão criados no SSR 
    false - os conteudos que não foram gerados esticamente daram erro 404
     */
  }
}

//esse post serã usado para indexação do google então não precisa de verificação de logi
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID("publication", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
