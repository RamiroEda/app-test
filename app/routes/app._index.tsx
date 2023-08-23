import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  CalloutCard,
  IndexTable,
  Layout,
  Page,
  Text,
  Thumbnail,
  VerticalStack
} from "@shopify/polaris";
import type { Product } from "~/models/product";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);

  const products = await admin.rest.get({
    path: "/admin/api/2023-07/products.json",
    query: {
      limit: 10,
    }
  }).then((res) => res.json())
    .then<Product[]>((data) => data.products)
    .catch(() => undefined);

  console.log(products);



  return json({ shop: session.shop.replace(".myshopify.com", ""), products });
};

export default function Index() {
  const { shop, products } = useLoaderData<typeof loader>();

  return (
    <Page>
      <ui-title-bar title={`Nombre de la tienda: ${shop}`} />
      <Layout>
        <Layout.Section>
          <VerticalStack
            gap="8"
          >
            <CalloutCard
              illustration=""
              title="Revisa tu panel de ventas"
              primaryAction={{
                content: "Ver ventas",
                url: "/app/hello",
              }}
            >
              <p>
                Revisa el panel de ventas para ver el estado de tus ventas organizadas por fecha para que puedas tener un mejor control de tus ventas.
              </p>
            </CalloutCard>
            <Text as="h1" variant="heading4xl"> Productos </Text>
            <IndexTable
              headings={[
                { title: "Imagen" },
                { title: "Nombre" },
                { title: "Vendedor" },
              ]}
              itemCount={products?.length ?? 0}
              selectable={false}
            >
              {products?.map((product, index) => (<IndexTable.Row id={product.id.toString()} position={index} key={index}>
                <IndexTable.Cell>
                  <Thumbnail
                    source={product.images?.[0]?.src}
                    alt={product.title}
                  />
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {product.title}
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {product.vendor}
                </IndexTable.Cell>
              </IndexTable.Row>))}
            </IndexTable>
          </VerticalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
