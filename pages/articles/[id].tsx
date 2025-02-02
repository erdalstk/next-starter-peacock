import React from "react";
import { useRouter } from "next/router";

import { Layout, Container } from "../../components";
import { getAllContentIds, getContentData } from "../../lib/content";
import { StyledContent } from "../../components/styles/content.styles";

/**
 *  Renders articles markdown posts
 */

const Article = ({ notesData }: { notesData: IContentData }) => {
  const { pathname } = useRouter();
  const { title, contentHtml, description } = notesData;

  return (
    <Layout pathname={pathname} pageTitle={title} pageDescription={description}>
      <Container width="narrow">
        <StyledContent>
          <time>{notesData.date}</time>
          {notesData.previewImage && <img src={notesData.previewImage} />}
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </StyledContent>
      </Container>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllContentIds("articles");
  return {
    paths,
    fallback: false,
  };
};

export interface IContentData {
  id: string;
  contentHtml: string;
  date: Date;
  title: string;
  previewImage?: string;
  description?: string;
}

export const getStaticProps = async ({ params }) => {
  const notesData: IContentData = await getContentData(params.id, "articles");
  return {
    props: {
      notesData,
    },
  };
};

export default Article;
