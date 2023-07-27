import { ref } from 'vue';
export default function useLocationMap() {
  const zoom = ref(15);
  const center = ref([4.6609578, -74.1243111]);

  function pin(e) {
    const marker = e.target.getLatLng();
    center.value = [marker.lat, marker.lng];
    console.log(center.value);
  }

  return {
    zoom,
    center,
    pin,
  };
}
