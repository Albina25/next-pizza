import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList 
                title="Пиццы" 
                categoryId={1} 
                items={[
                  {
                    id:1,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                  {
                    id:2,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                  {
                    id:3,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                  {
                    id:4,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                ]} 
                
              />
              <ProductsGroupList 
                title="Комбо" 
                categoryId={2} 
                items={[
                  {
                    id:5,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                  {
                    id:6,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                  {
                    id:7,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                  {
                    id:8,
                    name: 'Пиццы',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif',
                    price: 550,
                    items: [{price: 550}]
                  },
                ]} 
                
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
