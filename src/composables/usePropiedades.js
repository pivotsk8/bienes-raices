import { computed, ref } from 'vue';
import { collection } from 'firebase/firestore';
import { useFirestore, useCollection } from 'vuefire';

export default function usePropiedades() {
  const piscina = ref(false);

  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, 'propiedades'));

  const propiedadesFiltradas = computed(() => {
    return piscina.value
      ? propiedadesCollection.value.filter((propiedad) => propiedad.piscina)
      : propiedadesCollection.value;
  });

  return {
    propiedadesCollection,
    propiedadesFiltradas,
    piscina,
  };
}
