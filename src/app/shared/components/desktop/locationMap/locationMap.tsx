import Icon from '@shared/components/common/icons';
import Title from '@shared/wrappers/Title';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import React from 'react';
import CollapsedTextMore from '@shared/components/mobile/collapsedText/collapsedText';
import './_locationMap.scss';

export default function LocationMap({
  pos,
  title,
  description,
  header,
}: {
  pos: { lat: number, lng: number };
  title: string | undefined;
  description: string | undefined;
  header: boolean;
}) {
  return (
    <div className="locationContainer">
      {header && <Title className="descriptionHeading">Location</Title>}
      <div className="location">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
          <Map mapId={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''} defaultCenter={pos} defaultZoom={10}>
            <AdvancedMarker position={pos}>
              <Icon name="dropLoc" width={100} height={100} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
      { title && (
        <Title className="descriptionHeading">
          {title}
        </Title>
      )}
      { description && (
        <CollapsedTextMore
          description={description}
          maxHeight={80}
          side="left"
        />
      )}
    </div>
  );
}
