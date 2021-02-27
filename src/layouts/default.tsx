import React, { PropsWithChildren } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Global } from '@emotion/react';
import { globalStyles, StyledDefaultLayout } from './default.styled';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      keywords: string;
    };
  };
}

const withDefaultLayout = <P extends PropsWithChildren<{}>>(Component: React.FC<P>): React.FC<P> => {
  return (props: P) => (
    <StaticQuery
      query={graphql`
        query DefaultLayoutQuery {
          site {
            siteMetadata {
              title
              description
              keywords
            }
          }
        }
      `}
      render={(data: StaticQueryProps) => (
        <StyledDefaultLayout>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: data.site.siteMetadata.description },
              { name: 'keywords', content: data.site.siteMetadata.keywords }
            ]}
          />
          <Global styles={globalStyles} />
          <NavBar />
          <Component {...props} />
          <Footer />
        </StyledDefaultLayout>
      )}
    />
  );
};

export default withDefaultLayout;
