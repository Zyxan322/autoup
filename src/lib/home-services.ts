import { PRODUCTS, SERVICES } from './catalog';
import { photo } from './media';
export const HOME_SERVICES = [
 ['car-shampoo','Car Shampoo','lifelines-colour-wax-shampoo',5],
 ['cleaning-chemicals','Cleaning Chemicals','lifelines-chemx-c2',6],
 ['wax-shine','Car Wax & Polish','lifelines-f55-wax',7],
 ['interior-cleaning','Interior Care','lifelines-chemx-d2',8],
 ['exterior-care','Exterior Care','lifelines-chemx-t1',9],
].map(([slug,title,product,n]) => {
 const service = SERVICES.find(s=>s.slug===slug);
 const recommendation = PRODUCTS.find(p=>p.slug===product);
 if (!service || !recommendation) throw new Error('Missing service recommendation');
 return { ...service, title: String(title), image: photo(`editorial-${n}`), modalImage: photo(`detail-${n}`), product: recommendation };
});
