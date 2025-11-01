import { Map, MapMarker } from "react-kakao-maps-sdk";

interface PartyMapProps {
  xmap: number;
  ymap: number;
}

export const PartyMap = ({ xmap, ymap }: PartyMapProps) => {
  return (
    <section className='mt-6 pb-6'>
      <h2 className='font-semibold mb-2 text-base'>지도</h2>
      <div className='w-full h-52 rounded-lg overflow-hidden'>
        <Map center={{ lat: ymap, lng: xmap }} style={{ width: "100%", height: "100%" }} level={3}>
          <MapMarker position={{ lat: ymap, lng: xmap }} />
        </Map>
      </div>
    </section>
  );
};
