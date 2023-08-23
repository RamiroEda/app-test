import { Layout, Page, Text } from '@shopify/polaris';
import * as React from 'react';


export default function Hello() {
    return (
        <Page title='Hello World Page Title'>
            <ui-title-bar title="Hello World UI Title" />
            <Layout>
                <Text as="h1" variant='heading4xl'>Hello World H1</Text>
            </Layout>
        </Page>
    );
}