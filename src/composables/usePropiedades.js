import { computed, ref } from 'vue';
import { collection, doc, deleteDoc } from 'firebase/firestore';
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

  async function deleteItem(id) {
    const docRef = doc(db, 'propiedades', id);

    confirm('¿deseas eliminar esta propiedad?')
      ? await deleteDoc(docRef)
      : null;
  }

  return {
    deleteItem,
    propiedadesCollection,
    propiedadesFiltradas,
    piscina,
  };
}
