import { computed, ref } from 'vue';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire';

export default function usePropiedades() {
  const piscina = ref(false);

  const storage = useFirebaseStorage();
  const db = useFirestore();
  const propiedadesCollection = useCollection(collection(db, 'propiedades'));

  const filteredItems = computed(() => {
    return piscina.value
      ? propiedadesCollection.value.filter((propiedad) => propiedad.piscina)
      : propiedadesCollection.value;
  });

  async function deleteItem(id, urlImage) {
    const docRef = doc(db, 'propiedades', id);
    const imageRef = storageRef(storage, urlImage);

    confirm('¿deseas eliminar esta propiedad?')
      ? await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
      : null;
  }

  return {
    deleteItem,
    propiedadesCollection,
    filteredItems,
    piscina,
  };
}
