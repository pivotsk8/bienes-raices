import { collection } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';
import { computed } from 'vue';

export default function usePropiedades() {
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, 'propiedades'));

  const propertyPrice = computed(() => {
    return (price) =>
      Number(price).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
      });
  });

  return { propiedadesCollection, propertyPrice };
}
